import { env } from '../../config/env';
import jwt, { SignOptions } from 'jsonwebtoken';

interface cookieOptions {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
}


const cookieOpts: cookieOptions = {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.sameSite,
};

function signAccess(userId: string, email: string, sessionId: string): string {
    const payload = { uid: userId, email: email, sid: sessionId };
    const options: SignOptions = { expiresIn: Number(env.accessExpiresMinutes) }; 
    return jwt.sign(payload, env.accessSecret, options);
}

export { cookieOptions, cookieOpts, signAccess };