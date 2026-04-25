"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { verifyUserAccount } from "@/store/auth.store"
import { responseData } from "@/types/types"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/utils"

function VerifyAccountContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [done, setDone] = useState(false)
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    const uid = searchParams.get("uid")
    const token = searchParams.get("token")

    const verifyAccount = async () => {
        try {
            const response = await dispatch(verifyUserAccount({ uid: uid || "", token: token || "" }));
            const payload: responseData = response.payload;
            console.log("Verification payload:", payload);
            if(payload.success) {
                setStatus("success")
                setTimeout(() => {
                    router.push("/signin")
                }, 500)
            } else {
                setStatus("error")
            }
        } catch (error) {
            const message = getErrorMessage(error);
            console.error("Verification error:", error);
            setStatus("error")
        } finally{
            setDone(true)
        }

    }
      verifyAccount()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center">
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#D87757] flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold">Aura</span>
            </div>
          </Link>

          {/* Status Display */}
          <div className="bg-card border border-border rounded-2xl p-12 shadow-lg">
            {status === "loading" && (
              <Card className="w-full max-w-md border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D87757] mb-4" />
                  <p className="text-muted-foreground">Validating verification link...</p>
                </CardContent>
              </Card>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#D87757]/10 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#D87757]" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">Account Verified!</h1>
                  <p className="text-muted-foreground">
                    Your email has been successfully verified. Redirecting to sign in...
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-destructive" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">Link Not Valid</h1>
                  <p className="text-muted-foreground mb-6">
                    The verification link is invalid or has expired. Please try signing up again.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-lg bg-[#D87757] text-white px-6 py-3 font-medium hover:bg-[#D87757]/90 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer Text */}
          {/* <p className="mt-8 text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/support" className="text-[#D87757] hover:underline font-medium">
              Contact Support
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default function VerifyAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#D87757]" />
        </div>
      }
    >
      <VerifyAccountContent />
    </Suspense>
  )
}
