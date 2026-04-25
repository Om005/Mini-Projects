"use client"

import { Suspense } from "react"
// import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { Header } from "@/components/header"

export default function ForgotPasswordPage() {
  return (
    <>
  <Header />

  <div className="flex-1 flex items-center justify-center p-4 bg-background">
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  </div>
</>

  )
}
