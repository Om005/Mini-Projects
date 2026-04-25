"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Loader2 } from "lucide-react"
import Link from "next/link"
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from "sonner"
import { signupUser } from "@/store/auth.store"
import { getErrorMessage } from "@/lib/utils"
import { responseData } from "@/types/types"
interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 6 characters", test: (pwd) => pwd.length >= 6 },
  { label: "At least 1 lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
  { label: "At least 1 uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
  { label: "At least 1 number", test: (pwd) => /[0-9]/.test(pwd) },
  { label: "At least 1 special character", test: (pwd) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd) },
]


export default function SignupPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const passwordsMatch = password === confirmPassword && confirmPassword !== ""
  const allRequirementsMet = passwordRequirements.every((req) => req.test(password))

  const { isLoading } = useSelector((state: RootState) => state.auth);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const recaptchaToken = recaptchaValue;
  const emailValue = email;
  const passwordValue = password;

  const toastId = toast.loading("Creating your account...");

  try {
    const response = await dispatch(signupUser({ email: emailValue, password: passwordValue, recaptchaToken })) ;

    const payload: responseData = response.payload;

    if(payload.success == false) {
      if('error' in payload) {
        toast.error(payload.error, { id: toastId });
      }
      else {
        toast.success(payload.message, { id: toastId });
      }
      return;
    }
    
    const successMessage = payload?.message ?? "Signup successful 🎉";
    toast.success(successMessage, { id: toastId });

    
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    toast.error(message, { id: toastId });
    console.error("Signup failed:", error);
  } finally {
    recaptchaRef.current?.reset();
    setRecaptchaValue("");
  }
};
  return (
    <>
    
    <Card className="w-full max-w-md border-border/50">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#D87757] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span className="text-2xl font-bold">Aura</span>
        </div>
        <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
        <CardDescription>Get started with Aura online code IDE</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social Login Buttons */}
        {/* <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full bg-transparent">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="ml-2">Google</span>
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Github className="w-5 h-5" />
            <span className="ml-2">GitHub</span>
          </Button>
        </div> */}

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div> */}

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className="h-11"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Password Requirements */}
          {password && (
            <div className="mt-3 space-y-2 p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-xs font-medium text-muted-foreground mb-2">Password must contain:</p>
              <div className="space-y-1.5">
                {passwordRequirements.map((requirement, index) => {
                  const isMet = requirement.test(password)
                  return (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                          isMet ? "bg-green-500/20 border border-green-500" : "bg-muted border border-border"
                        }`}
                      >
                        {isMet && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={isMet ? "text-foreground" : "text-muted-foreground"}>{requirement.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
            className="h-11"
          />
          {confirmPassword && (
            <div className="flex items-center gap-2 text-xs mt-2">
              {passwordsMatch ? (
                <>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center bg-green-500/20 border border-green-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-green-500">Passwords match</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center bg-red-500/20 border border-red-500">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <span className="text-red-500">Passwords do not match</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
            <ReCAPTCHA
                onChange={(value) => setRecaptchaValue(value || '')}
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                size="normal"
                />
        </div>

        {/* Sign Up Button */}
        <Button
          onClick={(e) => handleSubmit(e)}
          className="w-full disabled:cursor-not-allowed h-11 bg-[#D87757] hover:bg-[#D87757]/90 text-white font-medium"
          disabled={!email || !allRequirementsMet || !passwordsMatch || recaptchaValue === '' || isLoading}
        >
          {isLoading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
          </> : "Create Account"}
        </Button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#D87757] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
    </>
  )
}
