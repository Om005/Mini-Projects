"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getErrorMessage } from "@/lib/utils"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { responseData } from "@/types/types"
import { resetPasswordConfirm, validatePasswordResetLink } from "@/store/auth.store"

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

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [isValidLink, setIsValidLink] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const uid = searchParams.get("uid")
  const token = searchParams.get("token")

  useEffect(() => {
    // Simulate link validation - Replace this with your actual validation logic
    const validateLink = async () => {
      setIsValidating(true)

      try {
        const response = await dispatch(validatePasswordResetLink({ uid: uid || "", token: token || "" }));
        const payload: responseData = response.payload;
        if(payload.success) {
          setIsValidLink(true)
        } else {
          setIsValidLink(false)
        }
      } catch (error) {
        const message = getErrorMessage(error);
        setIsValidLink(false)
      }finally{ 
          setIsValidating(false)
        }
    }

    validateLink()
  }, [uid, token])

  const passwordsMatch = password === confirmPassword && confirmPassword !== ""
  const allRequirementsMet = passwordRequirements.every((req) => req.test(password))
  const canSubmit = allRequirementsMet && passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setIsSubmitting(true)

    const toastId = toast.loading("Resetting password...");
    try {
      const response = await dispatch(resetPasswordConfirm({ uid: uid || "", token: token || "", newPassword: password }));
      const payload: responseData = response.payload;
      if(payload.success) {
        toast.success(payload?.message || "Password has been reset successfully", { id: toastId });
        router.push("/")
      } else {
        toast.error(payload?.error || "Password reset failed", { id: toastId });
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg, { id: toastId });      
    } finally {
      setIsSubmitting(false)
    }
    
  }

  if (isValidating) {
    return (
      <Card className="w-full max-w-md border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D87757] mb-4" />
          <p className="text-muted-foreground">Validating reset link...</p>
        </CardContent>
      </Card>
    )
  }

  if (!isValidLink) {
    return (
      <Card className="w-full max-w-md border-border/50">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Invalid Reset Link</CardTitle>
          <CardDescription className="text-base">
            This password reset link is invalid or has expired. Please request a new one.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full h-11 bg-[#D87757] hover:bg-[#D87757]/90 text-white font-medium" asChild>
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/signin" className="text-[#D87757] hover:underline font-medium">
              Back to Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
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
        <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none">
              New Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-[#D87757] hover:bg-[#D87757]/90 text-white font-medium"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>

          {/* Back to Sign In */}
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/signin" className="text-[#D87757] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
