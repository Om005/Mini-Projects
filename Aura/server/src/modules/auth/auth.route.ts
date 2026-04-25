import { Response, Request, Router } from "express";
import { isAuthenticated, logout, passwordResetConfirm, passwordResetRequest, refresh, register, signin, validatePasswordResetLink, verifyAccount } from "./auth.controller";
import { validateRequest } from "../../middlewares/validator";
import { passwordResetConfirmSchema, passwordResetRequestSchema, registerSchema, signinSchema, validatePasswordResetLinkSchema, verifyAccountSchema } from "./auth.validator";
import { authMiddleware } from "../../middlewares/auth";

const authRoute = Router();

authRoute.post('/register', validateRequest(registerSchema), register);
authRoute.post('/verify-account', validateRequest(verifyAccountSchema), verifyAccount);
authRoute.post('/signin', validateRequest(signinSchema), signin);
authRoute.post('/refresh-token', refresh);
authRoute.post('/logout', logout);
authRoute.post('/is-authenticated', authMiddleware, isAuthenticated);
authRoute.post('/password-reset-request', validateRequest(passwordResetRequestSchema), passwordResetRequest);
authRoute.post('/validate-password-reset-link', validateRequest(validatePasswordResetLinkSchema), validatePasswordResetLink);
authRoute.post('/password-reset-confirm', validateRequest(passwordResetConfirmSchema), passwordResetConfirm);

export default authRoute;