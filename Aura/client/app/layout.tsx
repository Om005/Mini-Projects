import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Providers } from "@/components/storeProvider"
import { Toaster } from "sonner"
import { ThemeToaster } from "@/components/toaster-theme"
import { checkAuthentication } from "@/store/auth.store"
import AuthInitializer from "@/components/auth-initializer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aura - Online Code IDE",
  description: "Experience the next generation of online coding with AI-powered features",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  checkAuthentication();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Providers>
            <ThemeToaster />  
            <AuthInitializer>
          {children}
          </AuthInitializer>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
