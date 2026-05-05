"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Map, LogOut, Menu, X, ChevronRight, MessageSquare, FileText, Video, Star } from "lucide-react"

const sidebarNav = [
  { name: "Tours", href: "/admin/tours", icon: Map },
  { name: "Video Gallery", href: "/admin/gallery", icon: Video },
  { name: "Pop Reels", href: "/admin/reels", icon: Star },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Custom Bookings", href: "/admin/custom-bookings", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Menu },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch("/api/auth/admin-check", { credentials: "include", cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          router.replace("/")
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data?.isAdmin) {
          setAuthorized(true)
          setAdminEmail(data.email || "")
        } else {
          router.replace("/")
        }
      })
      .catch(() => router.replace("/"))
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    if (typeof window !== "undefined") {
      localStorage.clear()
      sessionStorage.clear()
    }
    window.dispatchEvent(new Event("auth-changed"))
    router.replace("/")
  }

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-spinner" />
        <p className="admin-loading-text">Verifying admin access...</p>
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div className="admin-wrapper">
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-inner">
            <div className="admin-brand-icon">R</div>
            <div>
              <h2 className="admin-brand-title">Rajashri World</h2>
              <p className="admin-brand-subtitle">Admin Panel</p>
            </div>
          </div>
          <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <p className="admin-sidebar-label">MENU</p>
          {sidebarNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
                {isActive && <ChevronRight size={16} className="admin-sidebar-link-arrow" />}
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user">
            <div className="admin-sidebar-avatar">
              {adminEmail ? adminEmail[0].toUpperCase() : "A"}
            </div>
            <div className="admin-sidebar-user-info">
              <p className="admin-sidebar-user-name">Admin</p>
              <p className="admin-sidebar-user-email">{adminEmail}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-sidebar-logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-topbar-menu" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="admin-topbar-right">
            <span className="admin-topbar-role">Admin</span>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  )
}
