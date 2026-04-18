"use client"

import { useEffect, useState, useRef } from "react"
import { Star, Plus, Trash2, Pencil, ChevronLeft, Upload, Loader2, Save, Cloud, CheckCircle2, AlertTriangle, MapPin, Quote } from "lucide-react"

interface Review {
  id?: string
  name: string
  location: string
  content: string
  avatar: string
  rating: number
}

const NEW_REVIEW_TEMPLATE: Review = {
  name: "",
  location: "",
  content: "",
  avatar: "",
  rating: 5
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "edit">("list")
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchReviews() }, [])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/reviews")
      const data = await res.json()
      if (data.reviews) setReviews(data.reviews)
    } catch (err) { setMessage({ type: "error", text: "Failed to fetch reviews" }) }
    finally { setLoading(false) }
  }

  const handleEdit = (review: Review) => {
    setEditingReview({ ...review })
    setView("edit")
    window.scrollTo(0, 0)
  }

  const handleAddReview = () => {
    setEditingReview({ ...NEW_REVIEW_TEMPLATE })
    setView("edit")
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" })
      if (res.ok) fetchReviews()
    } catch (err) { alert("Delete failed") }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("bucket", "brochures")
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url && editingReview) setEditingReview({ ...editingReview, avatar: data.url })
    } catch (err) { alert("Upload failed") }
    finally { setUploading(false) }
  }

  const saveReview = async () => {
    if (!editingReview) return
    setSaving(true)
    try {
      const res = await fetch("/api/admin/reviews", {
        method: editingReview.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingReview),
      })
      if (res.ok) {
        setMessage({ type: "success", text: "Review saved" })
        fetchReviews()
        setTimeout(() => setView("list"), 1500)
      }
    } catch (err) { setMessage({ type: "error", text: "Save failed" }) }
    finally { setSaving(false) }
  }

  if (loading && view === "list") return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="animate-spin h-10 w-10 text-black mb-4" />
      <p className="text-gray-400 font-medium">Loading reviews...</p>
    </div>
  )

  if (view === "edit" && editingReview) return (
    <div className="max-w-3xl mx-auto pb-24 px-4">
      <div className="flex items-center justify-between mb-16 sticky top-0 bg-gray-50/90 backdrop-blur-lg py-6 z-10 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <button onClick={() => setView("list")} className="p-3 hover:bg-white rounded-2xl shadow-sm border border-transparent hover:border-gray-100 transition-all">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-black tracking-tight">{editingReview.id ? "Edit Review" : "Add Traveller Story"}</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Management</p>
          </div>
        </div>
        <button onClick={saveReview} disabled={saving} className="btn-admin btn-admin-primary !px-10">
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Cloud size={20} />}
          <span>{saving ? "Saving..." : "Save Story"}</span>
        </button>
      </div>

      <div className="space-y-12">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
          <div className="flex flex-col items-center gap-6">
             <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-100">
                  {editingReview.avatar ? (
                    <img src={editingReview.avatar} alt="Reviewer" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300"><Upload size={32} /></div>
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  {uploading ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
             </div>
             <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Traveller Profile Photo</p>
                <div className={`flex items-center gap-1.5 justify-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${editingReview.avatar?.includes("supabase.co") ? 'text-green-600' : 'text-orange-600'}`}>
                  {editingReview.avatar?.includes("supabase.co") ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                  {editingReview.avatar?.includes("supabase.co") ? "Synced" : "No Cloud Photo"}
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="admin-form-group">
              <label className="admin-label">Traveller Name</label>
              <input className="admin-input" value={editingReview.name} onChange={(e) => setEditingReview({...editingReview, name: e.target.value})} placeholder="e.g. Rahul Sharma" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Location / Trip</label>
              <input className="admin-input" value={editingReview.location} onChange={(e) => setEditingReview({...editingReview, location: e.target.value})} placeholder="e.g. Leh-Ladakh Expedition" />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Rating (Stars)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setEditingReview({...editingReview, rating: s})} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${editingReview.rating >= s ? 'bg-black text-white' : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}`}>
                  <Star size={20} fill={editingReview.rating >= s ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">The Story / Content</label>
            <textarea className="admin-textarea !min-h-[150px]" value={editingReview.content} onChange={(e) => setEditingReview({...editingReview, content: e.target.value})} placeholder="What did they say about their experience?" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">Reviews</h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">Manage traveller testimonials.</p>
        </div>
        <button onClick={handleAddReview} className="btn-admin btn-admin-primary !rounded-2xl !py-5 !px-10">
          <Plus size={24} /> Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4 group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-100">
                  <img src={review.avatar || "/placeholder.svg"} className="w-full h-full object-cover" alt={review.name} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <MapPin size={10} className="text-gray-400" />
                    {review.location}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(review)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-colors"><Pencil size={14} /></button>
                <button onClick={() => review.id && handleDelete(review.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            
            <div className="flex gap-0.5 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />
              ))}
            </div>

            <div className="relative">
              <Quote size={20} className="absolute -top-2 -left-1 text-gray-100 -z-0" />
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed relative z-10">{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
