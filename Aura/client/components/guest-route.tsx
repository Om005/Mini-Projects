"use client"

import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAuthLoading } = useSelector(
    (state: RootState) => state.auth
  )
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.push("/")
    }
  }, [isAuthLoading, isAuthenticated, router])

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : !isAuthenticated ? (
        children
      ) : null}
    </div>
  )
}

export { GuestRoute }
