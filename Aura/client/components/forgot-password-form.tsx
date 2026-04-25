"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mail, ArrowLeft, Clock } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { getErrorMessage } from "@/lib/utils"
import { toast } from "sonner"
import { resetPasswordRequest, setTempEmail } from "@/store/auth.store"
import { responseData } from "@/types/types"

export function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const dispatch = useDispatch();
  const sent = searchParams.get("sent") === "true"
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { tempEmail } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const toastId = toast.loading("Sending link");
      const response = await dispatch(resetPasswordRequest({ email: email }));
      const payload: responseData = response.payload;
      if(payload.success == false) {
        toast.error(payload?.error || "Failed sending email", { id: toastId });
      }
      else {
        dispatch(setTempEmail(email));
        toast.success(payload?.message || "If an account with that email exists, a password reset link has been sent.", { id: toastId });
        window.location.href = "/forgot-password?sent=true"
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error)
      toast.error(errorMsg);
    }
  }

  const handleResend = async () => {
    setIsSubmitting(true)

    try {
      const toastId = toast.loading("Sending link");
      const response = await dispatch(resetPasswordRequest({ email: email }));
      const payload: responseData = response.payload;
      if(payload.success == false) {
        toast.error(payload?.error || "Failed sending email", { id: toastId });
      }
      else {
        dispatch(setTempEmail(email));
        toast.success(payload?.message || "If an account with that email exists, a password reset link has been sent.", { id: toastId });
        window.location.href = "/forgot-password?sent=true"
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error)
      toast.error(errorMsg);
    }

    setIsSubmitting(false)
  }

  if (sent) {
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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#D87757]/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#D87757]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>We've sent a password reset link to your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Expiration Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
            <Clock className="w-5 h-5 text-[#D87757] mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Link expires in 30 minutes</p>
              <p className="text-xs text-muted-foreground">
                Please check your inbox and click the reset link before it expires
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>If you don't see the email, check your spam folder.</p>
          </div>

          {/* Resend Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 bg-transparent"
            onClick={handleResend}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Resend Email"}
          </Button>

          {/* Back to Sign In */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            <Link href="/signin" className="text-sm text-[#D87757] hover:underline font-medium">
              Back to sign in
            </Link>
          </div>
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
        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
        <CardDescription>No worries, we'll send you reset instructions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email of your account"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              required
            />
            <p className="text-xs text-muted-foreground">We'll send a password reset link to this email</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-[#D87757] hover:bg-[#D87757]/90 text-white font-medium"
            disabled={!email || isSubmitting || tempEmail==''}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {/* Back to Sign In */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          <Link href="/signin" className="text-sm text-[#D87757] hover:underline font-medium">
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
