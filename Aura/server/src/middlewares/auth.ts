import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env'
import { sendResponse } from '../utils/response';
import { prisma } from '../lib/prisma';
import axios from 'axios';

const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    if(!accessToken) {
        return res.status(401).json(sendResponse({success:false, error:'Session expired or not found, login again'}));
    }
    try {
        const decoded = jwt.verify(accessToken, env.accessSecret as string);
        if(!decoded || typeof decoded !== 'object' || !('uid' in decoded) || !('sid' in decoded) || !('email' in decoded)) {
            return res.status(401).json(sendResponse({success:false, error:'Session expired or not found, login again'}));
        }
        const session = await prisma.session.findUnique({
            where: { id: (decoded as any).sid },
        });
        
        if (!session || session.expiresAt <= new Date()) return res.status(401).json(sendResponse({success:false, error:'Session expired or not found, login again'}));
        
        (req as any).uid = (decoded as any).uid; 
        (req as any).sid = (decoded as any).sid;
        (req as any).email = (decoded as any).email;
        
        prisma.session.update({ where: { id: (decoded as any).sid }, data: { lastSeen: new Date() } }).catch(console.error);
        
        next();
    } catch (error) {
        return res.status(401).json(sendResponse({success:false, error:'ACCESS_TOKEN_EXPIRED'}));
    }
}

export { authMiddleware };