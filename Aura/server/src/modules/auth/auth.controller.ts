import { Request, Response } from 'express';
import argon2  from 'argon2';
import crypto from 'crypto';
import { prisma } from '../../lib/prisma';
import { env } from '../../config/env';
import { transporter } from '../../config/transporter';
import { UAParser } from 'ua-parser-js';
import { cookieOpts, signAccess } from './auth.jwt';
import { sendResponse } from '../../utils/response';
import axios from 'axios';

interface IPApiResponse {
  city?: string;
  region?: string;
  country_name?: string;
  [key: string]: any; 
}

function detectInfoFromUserAgent(userAgent?: string) {
    const parser = new UAParser(userAgent);
    const device = parser.getResult();
    return { deviceType: device.device.type || 'desktop', browser: device.browser.name || 'unknown', os: device.os.name || 'unknown' };
}

const register = async (req: Request, res: Response) =>{
    const { email, password, recaptchaToken } = req.body;
    console.log('Recaptcha Token:', recaptchaToken);
    try {

        const verifyResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify',
        null,
        {
            params: {
            secret: env.recaptchaSecretKey,
            response: recaptchaToken
            }
        });

        if (!verifyResponse.data.success) {
            return res.status(400).json(sendResponse({success:false, error:'reCAPTCHA verification failed'}));
        }

        const emailNorm = email.toLowerCase().trim();   
        const passwordHash = await argon2.hash(password);
        const name = email.split('@')[0];
        const isVerified = false;

        const rawVerif = crypto.randomBytes(32).toString('hex');
        const verifyHash = await argon2.hash(rawVerif);
        const verifyExpiry = new Date(Date.now()+24 * 60 * 60 * 1000);


        const existing = await prisma.user.findUnique({ where: { email: emailNorm } });
        if(existing){
            return res.status(400).json(sendResponse({success:false, error:'User already exists'}));
        }
        const newUser = await prisma.user.create({
            data: {
                email: emailNorm,
                password: passwordHash,
                name,
                isVerified,
                verificationToken: verifyHash,
                verificationTokenExpiry: verifyExpiry,
            }
        })
        let userId: string = newUser.id;
        const link = `${env.frontendUrl}/verify-account?uid=${encodeURIComponent(userId)}&token=${rawVerif}`;
        
        const mailOptions = {
            to: emailNorm,
            from: env.sendgridSenderEmail,
            subject: 'Please verify your email',
            text: `Click the following link to verify your email: ${link}`,
            html: `<p>Click the following link to verify your email:</p><p><a href="${link}">${link}</a></p>`,
        }
        await transporter.sendMail(mailOptions);

        return res.status(201).json(sendResponse({success:true, message:'Registration successful. Please check your email to verify your account.'}));

    } catch (error) {
        console.error('Error in register:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const verifyAccount = async (req: Request, res: Response) => {
    const { uid, token } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: uid } });
        if (!user || user.isVerified) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid link'}));
        }
        if (!user.verificationTokenExpiry || user.verificationTokenExpiry < new Date()) {
            return res.status(400).json(sendResponse({success:false, error:'Link expired'}));
        }

        const isTokenValid = await argon2.verify(user.verificationToken as string, token);
        if (!isTokenValid) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid link'}));
        }
        await prisma.user.update({
            where: { id: uid },
            data: { 
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiry: null,
            },
        });
        return res.status(200).json(sendResponse({success:true, message:'Account verified successfully'}));
    } catch (error) {
        console.error('Error in verifyAccount:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const signin = async (req: Request, res: Response) => {
    const { email, password, recaptchaToken } = req.body;
    const { deviceType, browser, os } = detectInfoFromUserAgent(req.headers['user-agent']);


    // console.log('IP Info:', ipInfo);
    try {

        const verifyResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify',
        null,
        {
            params: {
            secret: env.recaptchaSecretKey,
            response: recaptchaToken
            }
        });

        if (!verifyResponse.data.success) {
            return res.status(400).json(sendResponse({success:false, error:'reCAPTCHA verification failed'}));
        }

        const emailNorm = email.toLowerCase().trim();   
        const user = await prisma.user.findUnique({ where: { email: emailNorm } });
        if (!user) {
            return res.status(400).json(sendResponse({success:false, error:'User not found'}));
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid credentials'}));
        }
        if (!user.isVerified) {
            const mailOptions = {
                to: emailNorm,
                from: env.sendgridSenderEmail,
                subject: 'Please verify your email',
                text: `Your account is not verified. Please verify your email to sign in.`,
                html: `<p>Your account is not verified. Please verify your email to sign in.</p>`,
            }
            await transporter.sendMail(mailOptions);
            
            return res.status(400).json(sendResponse({success:false, message:'Account not verified. A new verification email has been sent.'}));
        }

        const expiresAt = new Date(Date.now() + env.refreshExpiresDays * 24 * 60 * 60 * 1000);
        const ipInfo: IPApiResponse = await fetch(`https://ipapi.co/${req.ip}/json/`);
        const { city, region, country_name } = await ipInfo.json();

        const newSession = await prisma.session.create({
            data: {
                userId: user.id,
                ip: req.ip,
                userAgent: req.headers['user-agent'] || '',
                browser: browser,
                os: os,
                city: city,
                region: region,
                country: country_name,
                deviceType: deviceType,
                expiresAt: expiresAt,
            }
        });

        const plainRefresh = `${newSession.id}.${crypto.randomBytes(48).toString('hex')}`
        const refreshHash = await argon2.hash(plainRefresh);
        await prisma.session.update({ where: { id: newSession.id }, data: { refreshTokenHash: refreshHash } });

        const access = signAccess(user.id, user.email,newSession.id);

        res.cookie('refreshToken', plainRefresh, {
            ...cookieOpts,
            maxAge: env.refreshExpiresDays * 24 * 60 * 60 * 1000,
        });

        res.cookie('accessToken', access, {
            ...cookieOpts,
            maxAge: env.accessTokenTtlMs,
        });

        return res.status(200).json(sendResponse({success:true, message:'Signin successful', data:{user:{id: user.id, email: user.email, name: user.name}}}));

    } catch (error) {
        console.error('Error in signin:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(401).json(sendResponse({success:false, error:'Session expired or not found, login again'}));
        }
        const parts = refreshToken.split('.');
        if (parts.length !== 2) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(401).json(sendResponse({success:false, error:'Session expired or not found, login again'}));
        }
        const sessionId = parts[0];
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: {
                user: {
                    select: {
                        email: true,
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if( !session ) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(401).json(sendResponse({success:false, error:'Session expired or not found, login again'}));
        }
        if (session.expiresAt < new Date() ) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            prisma.session.delete({
                where: {id: sessionId}
            })
            return res.status(401).json(sendResponse({success:false, error:'Session expired or revoked login again'}));
        }
        const matches = session.refreshTokenHash ? await argon2.verify(session.refreshTokenHash, refreshToken).catch(() => false) : false;
        
        if (!matches) {
            await prisma.session.deleteMany({
                where: { userId: session.user.id },
            });
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(401).json(sendResponse({success:false, error:'Session expired or not found, login again'}));
        }

        const newPlain = `${session.id}.${crypto.randomBytes(48).toString('hex')}`;
        const newHash = await argon2.hash(newPlain);
        await prisma.session.update({ where: { id: session.id }, data: { lastSeen: new Date(Date.now()), refreshTokenHash: newHash } });

        res.cookie('refreshToken', newPlain, {
            ...cookieOpts,
            maxAge: env.refreshExpiresDays * 24 * 60 * 60 * 1000,
        });

        const access = signAccess(session.userId, session.user.email, session.id);

        res.cookie('accessToken', access, {
            ...cookieOpts,
            maxAge: env.accessTokenTtlMs,
        });

        return res.status(200).json(sendResponse({success:true, data: { user: { id: session.user.id, email: session.user.email, name: session.user.name } }, message:'Token refreshed successfully'}));
    } catch (error) {
        console.error('Error in refresh:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if ( !refreshToken ) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(200).json(sendResponse({success:true, message:'If there was a session, logout successful'}));
        }
        const parts = refreshToken.split('.');
        if ( parts.length !== 2 ) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(200).json(sendResponse({success:true, message:'If there was a session, logout successful'}));
        }
        const sessionId = parts[0];
        if ( !sessionId ) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.status(200).json(sendResponse({success:true  , message:'If there was a session, logout successful'}));
        }
        await prisma.session.deleteMany({
            where: { id: sessionId },
        });

        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.status(200).json(sendResponse({success:true, message:'Logged out successfully'}));
    } catch (error) {
        console.error('Error in logout:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const isAuthenticated = async(req: Request, res: Response, next: Function) => {
    try {
        const id = (req as any).uid;
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: { name: true, email: true },
        })
        return res.status(200).json(sendResponse({success:true, data:{user:{id: id, name: user?.name, email: user?.email}},message:'User is authenticated'}));
    } catch (error) {
        console.error('Error in isAuthenticated:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const passwordResetRequest = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const emailNorm = email.toLowerCase().trim();
        const user = await prisma.user.findUnique({ where: { email: emailNorm } });
        if (!user) {
            return res.status(200).json(sendResponse({success:true, message:'If an account with that email exists, a password reset link has been sent.'}));
        }
        const rawResetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = await argon2.hash(rawResetToken);
        const resetTokenExpiry = new Date(Date.now() + 1000*60*30);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetTokenHash,
                resetPasswordTokenExpiry: resetTokenExpiry,
            },
        });
        const link = `${env.frontendUrl}/reset-password?uid=${encodeURIComponent(user.id)}&token=${rawResetToken}`;

        const mailOptions = {
            to: emailNorm,
            from: env.sendgridSenderEmail,
            subject: 'Password Reset Request',
            text: `Click the following link to reset your password: ${link}`,
            html: `<p>Click the following link to reset your password:</p><p><a href="${link}">${link}</a></p>`,
        }
        await transporter.sendMail(mailOptions);
        
        return res.status(200).json(sendResponse({success:true, message:'If an account with that email exists, a password reset link has been sent.'}));
    } catch (error) {
        console.error('Error in passwordResetRequest:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const validatePasswordResetLink = async(req: Request, res: Response) => {
    const { uid, token } = req.body;
    try {
        const user = await prisma.user.findUnique(
            {where: {id: uid}}
        );
        if(!user) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid link'}));
        }
        if(!user.resetPasswordToken || !user.resetPasswordTokenExpiry) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid link'}));
        }
        if(user.resetPasswordTokenExpiry < new Date()) {
            return res.status(400).json(sendResponse({success:false, error:'Link expired'}));
        }
        const isTokenValid = await argon2.verify(user.resetPasswordToken as string, token);
        if(!isTokenValid) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid link'}));
        }
        return res.status(200).json(sendResponse({success:true, message:'Link is valid'}));
    } catch (error) {
        console.error('Error in passwordReset validation:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}

const passwordResetConfirm = async (req: Request, res: Response) => {
    try {
        const { uid, token, newPassword } = req.body;
        const user = await prisma.user.findUnique({ where: { id: uid } });
        if (!user || !user.resetPasswordToken || !user.resetPasswordTokenExpiry ) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid link or user not found'}));
        }
        if (user.resetPasswordTokenExpiry < new Date()) {
            return res.status(400).json(sendResponse({success:false, error:'Link expired'}));
        }
        const isTokenValid = await argon2.verify(user.resetPasswordToken as string, token);
        if (!isTokenValid) {
            return res.status(400).json(sendResponse({success:false, error:'Invalid link'}));
        }
        const newPasswordHash = await argon2.hash(newPassword);
        await prisma.$transaction([
            prisma.user.update({
                where: { id: user.id },
                data: {
                    password: newPasswordHash,
                    resetPasswordToken: null,
                    resetPasswordTokenExpiry: null,
                },
            }),
            prisma.session.deleteMany({
                where: { userId: user.id },
            })
        ]);

        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');

        return res.status(200).json(sendResponse({success:true, message:'Password reset successfully'}));

    } catch (error) {
        console.error('Error in passwordResetConfirm:', error);
        return res.status(500).json(sendResponse({success:false, error:'Internal server error'}));
    }
}


export { register, verifyAccount, signin, refresh, logout, passwordResetRequest, validatePasswordResetLink, passwordResetConfirm, isAuthenticated };