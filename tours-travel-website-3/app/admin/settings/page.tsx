"use client"

import { useEffect, useState } from "react"
import { Loader2, Save, Phone, Mail, MapPin, Facebook, Instagram, Youtube, CheckCircle2 } from "lucide-react"

interface Settings {
  phone1: string
  phone2: string
  email: string
  address: string
  maps_link: string
  facebook_url: string
  instagram_url: string
  youtube_url: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    phone1: "", phone2: "", email: "", address: "", maps_link: "", facebook_url: "", instagram_url: "", youtube_url: ""
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings", { cache: 'no-store' })
        const data = await res.json()
        if (data.settings) setSettings(data.settings)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully!" })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: "error", text: "Failed to save settings." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save settings." })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="animate-spin h-10 w-10 text-black mb-4" />
      <p className="text-gray-400 font-medium">Loading settings...</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">Company Settings</h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">Manage public contact info & social links.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-admin btn-admin-primary !rounded-2xl !py-4 !px-8">
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>{saving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm animate-scaleIn ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          <CheckCircle2 size={18} /> {message.text}
        </div>
      )}

      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-gray-100 pb-4">
          <Phone className="text-gray-400" size={20} /> Contact Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="admin-form-group">
            <label className="admin-label">Primary Phone</label>
            <input className="admin-input" value={settings.phone1 || ""} onChange={e => setSettings({...settings, phone1: e.target.value})} placeholder="+91 9876543210" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Secondary Phone (Optional)</label>
            <input className="admin-input" value={settings.phone2 || ""} onChange={e => setSettings({...settings, phone2: e.target.value})} placeholder="+91 9876543211" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input className="admin-input" type="email" value={settings.email || ""} onChange={e => setSettings({...settings, email: e.target.value})} placeholder="contact@company.com" />
          </div>
        </div>

        <div className="admin-form-group mt-4">
          <label className="admin-label flex items-center gap-1"><MapPin size={14} className="text-gray-400"/> Office Address</label>
          <textarea className="admin-textarea !min-h-[100px]" value={settings.address || ""} onChange={e => setSettings({...settings, address: e.target.value})} placeholder="123 Travel Street, City, Country" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Google Maps Link</label>
          <input className="admin-input" value={settings.maps_link || ""} onChange={e => setSettings({...settings, maps_link: e.target.value})} placeholder="https://maps.google.com/..." />
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-gray-100 pb-4">
          <Facebook className="text-gray-400" size={20} /> Social Media Links
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="admin-form-group">
            <label className="admin-label">Facebook URL</label>
            <input className="admin-input" value={settings.facebook_url || ""} onChange={e => setSettings({...settings, facebook_url: e.target.value})} placeholder="https://facebook.com/..." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Instagram URL</label>
            <input className="admin-input" value={settings.instagram_url || ""} onChange={e => setSettings({...settings, instagram_url: e.target.value})} placeholder="https://instagram.com/..." />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">YouTube URL</label>
            <input className="admin-input" value={settings.youtube_url || ""} onChange={e => setSettings({...settings, youtube_url: e.target.value})} placeholder="https://youtube.com/..." />
          </div>
        </div>
      </div>
    </div>
  )
}
