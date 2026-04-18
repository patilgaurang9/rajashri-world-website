"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Admin root redirects to Tours page
export default function AdminPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/admin/tours")
  }, [router])
  return null
}
