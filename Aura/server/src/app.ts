import express, { Request, Response } from 'express';
import { env } from './config/env';
import { prisma } from './lib/prisma';
import { verifyEmailTransporter } from './config/transporter';
import authRoute from './modules/auth/auth.route';
import cookieParser from 'cookie-parser';
import cors from "cors";
  
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));


app.use('/api/auth', authRoute);





// verifyEmailTransporter();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!', environment: env.nodeEnv });
});


export { app, prisma };
