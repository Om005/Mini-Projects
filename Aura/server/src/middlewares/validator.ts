import {  Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { sendResponse } from '../utils/response';



export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = JSON.parse(result.error.message)[0].message;

      return res.status(400).json(sendResponse({ success: false, error: message }));
    }
    req.body = result.data;
    next();
  };
};