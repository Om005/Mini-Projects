"use client"

import { GuestRoute } from '@/components/guest-route'
import { Header } from '@/components/header'
import SignupPage from '@/components/signup-page-content'
import React from 'react'

const page = () => {
  return (
    <div>
      <GuestRoute>
      <Header/>
      <div className="flex-1 w-full flex-col flex justify-center items-center">
      <SignupPage/>
      </div>
      </GuestRoute>
    </div>
  )
}

export default page
