import type React from "react"
import type { Metadata } from "next"

import { ClerkProvider, SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from '@clerk/nextjs'
import "./globals.css"
import { Providers } from "@/components/provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Practice Interview",
  description: "Created with el-noir",
  generator: "noir.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 min-h-screen flex flex-col">
          <header className="p-4 flex justify-end">
            <SignedOut>
              <div className="flex gap-2">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          
          <Suspense fallback={<div>Loading...</div>}>
            <Providers>{children}</Providers>
          </Suspense>

        </body>
      </html>
    </ClerkProvider>
  )
}