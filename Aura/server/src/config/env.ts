import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

interface EnvConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  frontendUrl: string;
  accessSecret: string;
  accessExpiresMinutes: string;
  refreshExpiresDays: number;
  accessTokenTtlMs: number;
  cookieSecure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  sendgridApiKey: string;
  sendgridSenderEmail: string;
  recaptchaSecretKey: string;
}

export const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  accessSecret: process.env.ACCESS_SECRET || 'default_access_secret',
  accessExpiresMinutes: process.env.ACCESS_EXPIRES_MINUTES || '15',
  refreshExpiresDays: parseInt(process.env.REFRESH_EXPIRES_DAYS || '7', 10),
  accessTokenTtlMs: parseInt(process.env.ACCESS_TOKEN_TTL_MS || '900000', 10),
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  sameSite: (process.env.SAME_SITE as 'lax' | 'strict' | 'none') || 'lax',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  sendgridSenderEmail: process.env.SENDGRID_SENDER_EMAIL || '',
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
};

const validateEnv = () => {
  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is required in environment variables');
  }
  console.log("✅ Environment variables validated");
};

validateEnv();