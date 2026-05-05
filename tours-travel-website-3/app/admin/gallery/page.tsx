"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Upload, Trash2, Plus, Film, AlertCircle, Loader2 } from "lucide-react"

export default function AdminGalleryPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState({ type: "", text: "" })

  const fetchVideos = async () => {
    setLoading(true)
    const res = await fetch("/api/gallery")
    const { data } = await res.json()
    if (data) setVideos(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchVideos()
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

      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          video_url: publicUrl,
          category: "Gallery"
        })
      })

      if (!res.ok) throw new Error("Failed to save to database")

      setMessage({ type: "success", text: "Video uploaded successfully!" })
      setTitle("")
      setFile(null)
      fetchVideos()
    } catch (err: any) {
      console.error(err)
      setMessage({ type: "error", text: err.message || "Upload failed" })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      const fileName = url.split("/").pop()
      if (fileName) {
        await supabase.storage.from("video-gallery").remove([fileName])
      }

      await supabase.from("video_gallery").delete().eq("id", id)
      setVideos(videos.filter(v => v.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete")
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Video Gallery</h1>
          <p className="text-slate-500 font-medium">Manage cinematic content for the homepage</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Plus className="text-orange-600" /> Add New Video
        </h2>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Video Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exploring the Himalayas"
              className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-600/20 font-bold"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Video File</label>
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
                  <Loader2 className="animate-spin" /> Uploading to Supabase...
                </>
              ) : (
                <>
                  <Film size={20} /> Publish to Gallery
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

      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse" />)
        ) : videos.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
             <Film className="mx-auto mb-4 text-slate-300" size={48} />
             <p className="text-slate-500 font-bold">No videos in the gallery yet.</p>
          </div>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm group">
              <div className="aspect-video bg-black relative">
                <video src={video.video_url} className="w-full h-full object-cover" muted />
                <button 
                  onClick={() => handleDelete(video.id, video.video_url)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-black text-slate-900 truncate">{video.title}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Uploaded {new Date(video.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
