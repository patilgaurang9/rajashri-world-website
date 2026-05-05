"use client"

import { useEffect, useState } from "react"
import { Loader2, Save, Phone, Mail, MapPin, Facebook, Instagram, Youtube, CheckCircle2, Upload, Trash2, Play, ExternalLink } from "lucide-react"
import { compressImage } from "@/lib/image-utils"

interface Settings {
  phone1: string
  phone2: string
  email: string
  address: string
  maps_link: string
  facebook_url: string
  instagram_url: string
  youtube_url: string
  welcome_reel_url?: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    phone1: "", phone2: "", email: "", address: "", maps_link: "", facebook_url: "", instagram_url: "", youtube_url: "", welcome_reel_url: ""
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

      </div>

      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-gray-100 pb-4">
          <Play className="text-gray-400" size={20} /> Welcome Reel (Popup)
        </h2>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">This video will appear as a popup when users first visit your website. Best for short Reels or announcements.</p>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
                  <Play size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
                    {settings.welcome_reel_url ? "Welcome_Reel.mp4" : "No video uploaded"}
                  </div>
                  {settings.welcome_reel_url && <div className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Active</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {settings.welcome_reel_url && (
                  <>
                    <a href={settings.welcome_reel_url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 transition-colors">
                      <ExternalLink size={18} />
                    </a>
                    <button onClick={() => setSettings({...settings, welcome_reel_url: ""})} className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
                <input 
                  type="file" 
                  id="reel-upload" 
                  className="hidden" 
                  accept="video/*" 
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setSaving(true);
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("bucket", "brochures");
                    try {
                      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                      const data = await res.json();
                      if (data.url) setSettings({...settings, welcome_reel_url: data.url});
                    } catch (err) { alert("Upload error"); }
                    finally { setSaving(false); }
                  }} 
                />
                <button
                  className="btn-admin btn-admin-primary !py-2 !px-4 !rounded-xl !text-xs"
                  onClick={() => document.getElementById('reel-upload')?.click()}
                  disabled={saving}
                >
                  <Upload size={14} className="mr-2" />
                  <span>{settings.welcome_reel_url ? "Replace Video" : "Upload Video"}</span>
                </button>
              </div>
            </div>
            
            {settings.welcome_reel_url && (
              <div className="mt-4 aspect-[9/16] max-w-[200px] mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-black">
                <video src={settings.welcome_reel_url} controls className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
