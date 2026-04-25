import { z } from 'zod';

const registerSchema = z.object({
  email: z
    .string()
    .email(),
  recaptchaToken: z.string().min(1, 'Recaptcha token is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters')
    .refine(val => /[a-z]/.test(val), {
      message: 'Password must contain at least 1 lowercase letter',
    })
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least 1 uppercase letter',
    })
    .refine(val => /\d/.test(val), {
      message: 'Password must contain at least 1 number',
    })
    .refine(val => /[^A-Za-z0-9]/.test(val), {
      message: 'Password must contain at least 1 special character',
    }),
});

const verifyAccountSchema = z.object({
  uid: z.string().uuid(),
  token: z.string().min(1, 'Verification token is required'),
});

const signinSchema = z.object({
  email: z
    .string()
    .email(),
  password: z.string().min(1, 'Password is required'),
  recaptchaToken: z.string().min(1, 'Recaptcha token is required'),
});

const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .email(),
});

const validatePasswordResetLinkSchema = z.object({
  uid: z.string().uuid(),
  token: z.string().min(1, 'Reset token is required'),
});

const passwordResetConfirmSchema = z.object({
  uid: z.string().uuid(),
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters')
    .refine(val => /[a-z]/.test(val), {
      message: 'Password must contain at least 1 lowercase letter',
    })
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least 1 uppercase letter',
    })
    .refine(val => /\d/.test(val), {
      message: 'Password must contain at least 1 number',
    })
    .refine(val => /[^A-Za-z0-9]/.test(val), {
      message: 'Password must contain at least 1 special character',
    }),
});


export { registerSchema, verifyAccountSchema, signinSchema, passwordResetRequestSchema, validatePasswordResetLinkSchema, passwordResetConfirmSchema };