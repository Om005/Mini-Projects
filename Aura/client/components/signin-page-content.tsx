"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Loader2 } from "lucide-react"
import Link from "next/link"
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { getErrorMessage } from "@/lib/utils"
import { toast } from "sonner"
import { checkAuthentication, refreshToken, signinUser } from "@/store/auth.store"
import { useRouter } from "next/navigation"


export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
   const [recaptchaValue, setRecaptchaValue] = useState<string>('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
    const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const toastId = toast.loading("Signing you in...");
    try {
        const response = await dispatch<any>(signinUser({ email, password, recaptchaToken: recaptchaValue }));
        const payload = response.payload;
        console.log("Signin payload:", response);
        if(payload.success == false) {
            if ('error' in payload) {
                toast.error(payload.error || "Sign in failed", { id: toastId });
            }
            else{
                toast.success("Signed in successfully!", { id: toastId });
            }
            return;
        }
        toast.success("Signed in successfully!", { id: toastId });
        setEmail("");
        setPassword("");
        router.push('/');
    } catch (error) {
      console.error("Sign in error:", error)
      const message = getErrorMessage(error);
      toast.error(message, { id: toastId });
      console.error("Signup failed:", error);
    } finally {
        recaptchaRef.current?.reset();
        setRecaptchaValue("");
    }
  }

  const handleGoogleSignIn = () => {
    // Add your Google sign-in logic here
    console.log("Google sign in clicked")
  }

  const handleGithubSignIn = () => {
    // Add your GitHub sign-in logic here
    console.log("GitHub sign in clicked")
  }

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
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Sign in to your Aura account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleGoogleSignIn}>
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
            <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleGithubSignIn}>
              <Github className="w-5 h-5" />
              <span className="ml-2">GitHub</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

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
              className="h-11"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[#D87757] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pr-10"
                required
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
          </div>

          <div className="flex items-center justify-center">
            <ReCAPTCHA
                onChange={(value) => setRecaptchaValue(value || '')}
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                size="normal"
                />
        </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-[#D87757] hover:bg-[#D87757]/90 text-white font-medium"
            disabled={!email || !password || recaptchaValue==='' || isLoading}
          >
            {isLoading ? <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Signing In...
            </> : "Sign In"}
          </Button>
          
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#D87757] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </CardContent>

    </Card>
    
    </>
  )
}
