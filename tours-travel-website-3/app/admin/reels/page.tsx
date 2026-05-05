"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Upload, Trash2, Plus, Film, AlertCircle, Loader2, Star } from "lucide-react"

export default function AdminReelsPage() {
  const [reels, setReels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState({ type: "", text: "" })

  const fetchReels = async () => {
    setLoading(true)
    const res = await fetch("/api/reels?all=true")
    const { data } = await res.json()
    if (data) setReels(data)
    setLoading(false)
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/reels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: !currentStatus })
      })
      if (res.ok) {
        fetchReels()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchReels()
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) return

    setUploading(true)
    setMessage({ type: "", text: "" })

    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("video-gallery")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from("video-gallery")
        .getPublicUrl(filePath)

      const res = await fetch("/api/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          video_url: publicUrl
        })
      })

      if (!res.ok) throw new Error("Failed to save to database")

      setMessage({ type: "success", text: "Pop Reel uploaded successfully!" })
      setTitle("")
      setFile(null)
      fetchReels()
    } catch (err: any) {
      console.error(err)
      setMessage({ type: "error", text: err.message || "Upload failed" })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this reel?")) return

    try {
      const fileName = url.split("/").pop()
      if (fileName) {
        await supabase.storage.from("video-gallery").remove([fileName])
      }

      await supabase.from("pop_reels").delete().eq("id", id)
      setReels(reels.filter(v => v.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete")
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Pop Reels Manager</h1>
          <p className="text-slate-500 font-medium">Manage multiple promotional reels for the welcome popup</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-orange-600" /> Add New Pop Reel
        </h2>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Reel Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Special 2025"
              className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-600/20 font-bold"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Video File (Portrait recommended)</label>
            <div className="relative h-14">
              <input 
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
              />
              <div className="w-full h-full px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center gap-3 font-bold text-slate-500">
                <Upload size={20} />
                {file ? file.name : "Click to select video"}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <button 
              disabled={uploading || !file || !title}
              className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-900/10"
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Film size={20} /> Add to Reels Collection
                </>
              )}
            </button>
          </div>
          {message.text && (
            <div className={`md:col-span-2 p-4 rounded-xl flex items-center gap-3 font-bold text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              <AlertCircle size={18} />
              {message.text}
            </div>
          )}
        </form>
      </div>

      {/* Reels List */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="aspect-[9/16] bg-slate-100 rounded-3xl animate-pulse" />)
        ) : reels.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
             <Star className="mx-auto mb-4 text-slate-300" size={48} />
             <p className="text-slate-500 font-bold">No active reels found.</p>
          </div>
        ) : (
          reels.map((reel) => (
            <div key={reel.id} className={`bg-white rounded-3xl border transition-all overflow-hidden shadow-sm group ${reel.is_active ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-100'}`}>
              <div className="aspect-[9/16] bg-black relative">
                <video src={reel.video_url} className="w-full h-full object-cover" muted />
                
                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button 
                    onClick={() => handleDelete(reel.id, reel.video_url)}
                    className="w-10 h-10 bg-white/20 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end gap-3">
                   <h3 className="text-white font-bold text-sm truncate">{reel.title}</h3>
                   
                   <button 
                     onClick={() => !reel.is_active && toggleActive(reel.id, reel.is_active)}
                     disabled={reel.is_active}
                     className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                       reel.is_active 
                       ? "bg-orange-600 text-white cursor-default" 
                       : "bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md"
                     }`}
                   >
                     {reel.is_active ? "Currently Active" : "Make Active"}
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
