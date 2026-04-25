"use client"

import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/reset-password-form"

function ResetPasswordContent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <ResetPasswordForm />
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D87757]" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}
