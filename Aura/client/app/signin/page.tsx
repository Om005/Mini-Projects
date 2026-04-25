"use client"

import { GuestRoute } from '@/components/guest-route'
import { Header } from '@/components/header'
import SignInForm from '@/components/signin-page-content'
import React from 'react'

const page = () => {
  return (
    <>
      <GuestRoute>
      <Header/>
      <div className="flex-1 flex items-center justify-center p-4 bg-background">
      <SignInForm/>
      </div>
      </GuestRoute>
    </>
  )
}

export default page
