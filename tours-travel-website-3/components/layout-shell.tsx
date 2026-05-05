"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ReelPopup } from "@/components/reel-popup"
import { EnquiryPopup } from "@/components/enquiry-popup"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    // Admin routes use their own layout — no Navbar/Footer
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <ReelPopup />
      <EnquiryPopup />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
