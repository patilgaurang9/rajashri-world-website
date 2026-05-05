"use client"

import { useEffect, useState, useRef } from "react"
import { MapPin, Calendar, Clock, Save, X, Pencil, ExternalLink, Plus, Trash2, ChevronLeft, Upload, Loader2, Eye, AlertTriangle, Cloud, FileText, CheckCircle2 } from "lucide-react"
import { compressImage } from "@/lib/image-utils"

interface Tour {
  id?: string
  slug: string
  title: string
  description: string
  location: string
  start_date: string
  end_date: string
  price_without_flight: number | null
  price_with_flight: string | null
  currency: string
  duration_days: number
  duration_nights: number | string
  highlights: string[]
  itinerary: any[]
  inclusions: string[]
  exclusions: string[]
  know_before_you_go: string[]
  gallery: string[]
  video_urls: string[]
  brochure_url: string
  days_breakdown: any[]
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const NEW_TOUR_TEMPLATE: Tour = {
  id: undefined,
  slug: "",
  title: "",
  description: "",
  location: "",
  start_date: "",
  end_date: "",
  price_without_flight: null,
  price_with_flight: "",
  currency: "INR",
  duration_days: 1,
  duration_nights: 0,
  highlights: [],
  itinerary: [],
  inclusions: [],
  exclusions: [],
  know_before_you_go: [],
  gallery: [],
  video_urls: [],
  brochure_url: "",
  days_breakdown: [],
}

// Custom Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, title: string, message: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleIn border border-gray-100">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Trash2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        <p className="text-gray-500 text-center mb-8">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all">Delete</button>
        </div>
      </div>
    </div>
  );
};

// Asset Status Helper
const AssetStatus = ({ url }: { url: string }) => {
  if (!url) return null;
  const isCloud = url.includes("supabase.co") || url.startsWith("http");
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isCloud ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
      {isCloud ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
      {isCloud ? "Cloud Synced" : "Local/Legacy Path"}
    </div>
  );
};

// File Upload Component
const FileUpload = ({ label, currentUrl, onUpload, onClear, bucket = "brochures", accept = "*" }: { label: string, currentUrl: string, onUpload: (url: string) => void, onClear: () => void, bucket?: string, accept?: string }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      let fileToUpload: File | Blob = file;
      if (file.type.startsWith("image/")) {
        fileToUpload = await compressImage(file);
      }
      
      const formData = new FormData();
      formData.append("file", fileToUpload, file.name);
      formData.append("bucket", bucket);
      
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onUpload(data.url);
      else alert(data.error || "Upload failed");
    } catch (err) { alert("Upload error"); }
    finally { setUploading(false); }
  };

  return (
    <div className="admin-form-group">
      <label className="admin-label">{label}</label>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
              <FileText size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
                {currentUrl ? "Tour_Brochure" : "No file attached"}
              </div>
              <AssetStatus url={currentUrl} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentUrl && (
              <>
                <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 transition-colors">
                  <ExternalLink size={18} />
                </a>
                <button onClick={onClear} className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept={accept} onChange={handleUpload} />
            <button
              className="btn-admin btn-admin-primary !py-2 !px-4 !rounded-xl !text-xs"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
              <span>{uploading ? "Uploading..." : (currentUrl ? "Replace" : "Upload")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Gallery Editor (Unlimited photos)
const GalleryEditor = ({ photos, onChange }: { photos: string[], onChange: (newPhotos: string[]) => void }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    const newPhotos = [...photos];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        let fileToUpload: File | Blob = file;
        // Basic optimization for performance
        if (file.type.startsWith("image/")) {
          fileToUpload = await compressImage(file);
        }
        
        const formData = new FormData();
        formData.append("file", fileToUpload, file.name);
        formData.append("bucket", "brochures");
        
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) newPhotos.push(data.url);
      } catch (err) { 
        console.error("Upload error", err);
      }
    }
    
    onChange(newPhotos);
    setUploading(false);
  };

  return (
    <div className="admin-form-group admin-form-grid-full">
      <div className="flex items-center justify-between mb-4">
        <label className="admin-label !mb-0">Photo Gallery ({photos.length} photos)</label>
        <AssetStatus url={photos.find(p => !p.includes("supabase.co")) || "cloud"} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {photos.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-white">
            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white text-red-500 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-all" onClick={() => onChange(photos.filter((_, i) => i !== index))}>
                <Trash2 size={16} />
              </button>
            </div>
            {!url.includes("supabase.co") && !url.startsWith("http") && (
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-orange-500 text-[8px] text-white font-bold rounded uppercase">Local</div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
              #{index + 1}
            </div>
          </div>
        ))}
        <button 
          className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-black hover:text-black hover:bg-gray-50 transition-all"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="animate-spin" size={24} /> : <Plus size={24} />}
          <span className="text-[10px] font-bold uppercase tracking-widest">{uploading ? "Uploading..." : "Add Photos"}</span>
        </button>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleUpload} />
    </div>
  );
};

// Video Editor
const VideoEditor = ({ videos, onChange }: { videos: string[], onChange: (newVideos: string[]) => void }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    const newVideos = [...videos];
    
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("bucket", "brochures"); // Using same bucket for now
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) newVideos.push(data.url);
      } catch (err) { console.error("Video upload error", err); }
    }
    
    onChange(newVideos);
    setUploading(false);
  };

  return (
    <div className="admin-form-group admin-form-grid-full mt-12">
      <div className="flex items-center justify-between mb-4">
        <label className="admin-label !mb-0">Video Gallery ({videos.length} videos)</label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((url, index) => (
          <div key={index} className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-black">
            <video src={url} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all pointer-events-none">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white text-red-500 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-all" onClick={() => onChange(videos.filter((_, i) => i !== index))}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
              Video #{index + 1}
            </div>
          </div>
        ))}
        <button 
          className="aspect-video rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-black hover:text-black hover:bg-gray-50 transition-all"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
          <span className="text-[10px] font-bold uppercase tracking-widest">{uploading ? "Uploading..." : "Add Videos"}</span>
        </button>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="video/*" multiple onChange={handleUpload} />
    </div>
  );
};

// Helper components for lists and itinerary...
const ListEditor = ({ label, items, onChange }: { label: string, items: string[], onChange: (newItems: string[]) => void }) => {
  const addItem = () => onChange([...items, ""]);
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));
  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="admin-form-group admin-form-grid-full">
      <label className="admin-label">{label}</label>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <input className="admin-input !rounded-xl" value={item} onChange={(e) => updateItem(index, e.target.value)} placeholder={`Add ${label.toLowerCase()}...`} />
            <button className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" onClick={() => removeItem(index)}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        <button className="w-full py-4 border-2 border-dashed border-gray-50 rounded-2xl text-gray-400 hover:border-black hover:text-black hover:bg-white transition-all flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em]" onClick={addItem}>
          <Plus size={16} /> Add New Item
        </button>
      </div>
    </div>
  );
};

const DaysBreakdownEditor = ({ items, onChange }: { items: any[], onChange: (newItems: any[]) => void }) => {
  const addItem = () => onChange([...items, { city: "", days: 1 }]);
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  return (
    <div className="admin-form-group admin-form-grid-full mt-8">
      <label className="admin-label flex items-center justify-between">
        <span>Days Breakdown (e.g., Yamunotri 3 Days)</span>
      </label>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100 relative">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="admin-input !bg-white" value={item.city || ""} onChange={(e) => updateItem(index, "city", e.target.value)} placeholder="City Name" />
              <input type="number" className="admin-input !bg-white" value={item.days || ""} onChange={(e) => updateItem(index, "days", parseInt(e.target.value) || 1)} placeholder="Days (e.g. 3)" />
            </div>
            <button className="p-3 text-red-400 hover:text-red-600 bg-white rounded-xl shadow-sm border border-gray-100" onClick={() => removeItem(index)}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        <button className="w-full py-4 border-2 border-dashed border-gray-50 rounded-2xl text-gray-400 hover:border-black hover:text-black hover:bg-white transition-all flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em]" onClick={addItem}>
          <Plus size={16} /> Add City Breakdown
        </button>
      </div>
    </div>
  );
};

const ItineraryEditor = ({ items, onChange }: { items: any[], onChange: (newItems: any[]) => void }) => {
  const addItem = () => onChange([...items, { day: items.length + 1, hotel: "", title: "", description: "" }]);
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 }));
    onChange(newItems);
  };
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  return (
    <div className="admin-form-group admin-form-grid-full">
      <label className="admin-label">Tour Itinerary</label>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">D{item.day}</span>
                <div>
                  <h4 className="font-bold text-gray-900">Day {item.day} Schedule</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Main Itinerary</p>
                </div>
              </div>
              <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => removeItem(index)}>
                <Trash2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="admin-form-group">
                <label className="admin-label">Day Theme / Title</label>
                <input className="admin-input" value={item.title || ""} onChange={(e) => updateItem(index, "title", e.target.value)} placeholder="e.g. Arrival in Paradise" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Stay / Accommodation</label>
                <input className="admin-input" value={item.hotel || ""} onChange={(e) => updateItem(index, "hotel", e.target.value)} placeholder="Hotel name..." />
              </div>
              <div className="admin-form-group md:col-span-2">
                <label className="admin-label">Plan Description</label>
                <textarea className="admin-textarea" value={item.description || ""} onChange={(e) => updateItem(index, "description", e.target.value)} rows={3} placeholder="What will happen today?" />
              </div>
            </div>
          </div>
        ))}
        <button className="btn-admin btn-admin-outline w-full !py-5 !rounded-3xl !border-dashed !border-2" onClick={addItem}>
          <Plus size={20} /> Add Next Day
        </button>
      </div>
    </div>
  );
};

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"list" | "edit">("list")
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, id: string, title: string }>({ isOpen: false, id: "", title: "" })

  useEffect(() => { fetchTours() }, [])

  const fetchTours = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/tours", { credentials: "include", cache: "no-store" })
      if (!res.ok) {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to fetch tours" });
        return;
      }
      const data = await res.json()
      if (data.tours) {
        const parsedTours = data.tours.map((t: any) => ({
          ...t,
          highlights: typeof t.highlights === "string" ? JSON.parse(t.highlights || "[]") : (t.highlights || []),
          inclusions: typeof t.inclusions === "string" ? JSON.parse(t.inclusions || "[]") : (t.inclusions || []),
          exclusions: typeof t.exclusions === "string" ? JSON.parse(t.exclusions || "[]") : (t.exclusions || []),
          know_before_you_go: typeof t.know_before_you_go === "string" ? JSON.parse(t.know_before_you_go || "[]") : (t.know_before_you_go || []),
          gallery: typeof t.gallery === "string" ? JSON.parse(t.gallery || "[]") : (t.gallery || []),
          video_urls: typeof t.video_urls === "string" ? JSON.parse(t.video_urls || "[]") : (t.video_urls || []),
          itinerary: typeof t.itinerary === "string" ? JSON.parse(t.itinerary || "[]") : (t.itinerary || []),
          days_breakdown: typeof t.days_breakdown === "string" ? JSON.parse(t.days_breakdown || "[]") : (t.days_breakdown || []),
        }))
        setTours(parsedTours)
      }
    } catch (err) { setMessage({ type: "error", text: "Network error" }) }
    finally { setLoading(false); }
  }

  const handleEdit = (tour: Tour) => {
    setEditingTour({ ...tour })
    setView("edit")
    window.scrollTo(0, 0)
  }

  const handleAddTour = () => {
    setEditingTour({ ...NEW_TOUR_TEMPLATE })
    setView("edit")
    window.scrollTo(0, 0)
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/admin/tours?id=${deleteModal.id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Tour removed" });
        fetchTours();
      }
    } catch (err) { alert("Delete failed") }
    finally { setDeleteModal({ isOpen: false, id: "", title: "" }) }
  }

  const updateField = (field: keyof Tour, value: any) => {
    if (!editingTour) return
    if (field === "title") {
      const nextTitle = String(value)
      setEditingTour({
        ...editingTour,
        title: nextTitle,
        slug: slugify(nextTitle),
      })
      return
    }
    setEditingTour({ ...editingTour, [field]: value })
  }

  const saveTour = async () => {
    if (!editingTour) return
    setSaving(true)
    setMessage(null)
    const generatedSlug = slugify(editingTour.title)
    
    // Mapping back to DB format (stringified JSON)
    const payload = {
      ...editingTour,
      slug: generatedSlug,
      highlights: JSON.stringify(editingTour.highlights),
      inclusions: JSON.stringify(editingTour.inclusions),
      exclusions: JSON.stringify(editingTour.exclusions),
      know_before_you_go: JSON.stringify(editingTour.know_before_you_go),
      gallery: JSON.stringify(editingTour.gallery),
      video_urls: JSON.stringify(editingTour.video_urls),
      itinerary: JSON.stringify(editingTour.itinerary),
      days_breakdown: JSON.stringify(editingTour.days_breakdown),
      start_date: editingTour.start_date ? editingTour.start_date : null,
      end_date: editingTour.end_date ? editingTour.end_date : null,
    }

    try {
      const res = await fetch("/api/admin/tours", {
        method: editingTour.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setMessage({ type: "success", text: "Tour saved successfully" })
        await fetchTours()
        setTimeout(() => setView("list"), 1500)
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Save failed" })
      }
    } catch (err) { setMessage({ type: "error", text: "Network error" }) }
    finally { setSaving(false); }
  }

  if (loading && view === "list") return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="animate-spin h-10 w-10 text-black mb-4" />
      <p className="text-gray-400 font-medium tracking-wide">Fetching destinations...</p>
    </div>
  )

  if (view === "edit" && editingTour) return (
    <div className="max-w-4xl mx-auto pb-24 px-4">
      <div className="flex items-center justify-between mb-16 sticky top-0 bg-gray-50/90 backdrop-blur-lg py-6 z-10 border-b border-gray-100">
        <div className="flex items-center gap-6">
          <button onClick={() => setView("list")} className="p-3 hover:bg-white rounded-2xl shadow-sm border border-transparent hover:border-gray-100 transition-all">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-black tracking-tight">{editingTour.id ? "Edit Tour Package" : "New Expedition"}</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{editingTour.slug || "new-package"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setView("list")} className="btn-admin btn-admin-outline !px-8">Discard</button>
          <button onClick={saveTour} disabled={saving} className="btn-admin btn-admin-primary !px-10 !shadow-2xl !shadow-black/20">
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Cloud size={20} />}
            <span>{saving ? "Saving..." : (editingTour.id ? "Sync Changes" : "Create Tour")}</span>
          </button>
        </div>
      </div>

      {message && (
        <div className={`admin-message ${message.type === "success" ? "admin-message--success" : "admin-message--error"}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-24">
        {/* Section 1: Identity */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black">01</div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em]">Identity & Content</h3>
          </div>
          <div className="space-y-10">
            <div className="admin-form-group">
              <label className="admin-label">Tour Display Name</label>
              <input className="admin-input !text-2xl !font-black !py-8 !rounded-3xl" value={editingTour.title} onChange={(e) => updateField("title", e.target.value)} placeholder="e.g. Royal Rajasthan Safari" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="admin-form-group">
                <label className="admin-label">Primary Location</label>
                <input className="admin-input" value={editingTour.location} onChange={(e) => updateField("location", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">URL Slug</label>
                <input className="admin-input bg-gray-50 text-gray-500" value={slugify(editingTour.title) || "auto-generated-from-title"} readOnly />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Generated automatically from the title</p>
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Marketing Description</label>
              <textarea className="admin-textarea !min-h-[200px] !rounded-3xl !p-6" value={editingTour.description} onChange={(e) => updateField("description", e.target.value)} rows={6} />
            </div>
          </div>
        </section>

        {/* Section 2: Logistics */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black">02</div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em]">Logistics & Assets</h3>
          </div>
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="admin-form-group">
                <label className="admin-label">Start Date</label>
                <input type="date" className="admin-input" value={editingTour.start_date || ""} onChange={(e) => updateField("start_date", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">End Date</label>
                <input type="date" className="admin-input" value={editingTour.end_date || ""} onChange={(e) => updateField("end_date", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="admin-form-group">
                <label className="admin-label">Duration (Days)</label>
                <input type="number" className="admin-input" value={editingTour.duration_days} onChange={(e) => updateField("duration_days", parseInt(e.target.value))} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Duration (Nights)</label>
                <input className="admin-input" value={editingTour.duration_nights} onChange={(e) => updateField("duration_nights", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Base Currency</label>
                <input className="admin-input" value={editingTour.currency} onChange={(e) => updateField("currency", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="admin-form-group">
                <label className="admin-label">Price (With Flight)</label>
                <input className="admin-input" value={editingTour.price_with_flight || ""} onChange={(e) => updateField("price_with_flight", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Price (Land Only)</label>
                <input type="number" className="admin-input" value={editingTour.price_without_flight || ""} onChange={(e) => updateField("price_without_flight", e.target.value ? parseInt(e.target.value) : null)} />
              </div>
            </div>
            <FileUpload 
              label="Interactive Brochure" 
              currentUrl={editingTour.brochure_url} 
              onUpload={(url) => updateField("brochure_url", url)} 
              onClear={() => updateField("brochure_url", "")}
              accept=".pdf,image/*" 
            />
          </div>
        </section>

        {/* Section 3: Visuals */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black">03</div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em]">Visual Assets</h3>
          </div>
          <GalleryEditor photos={editingTour.gallery} onChange={(photos) => updateField("gallery", photos)} />
          <VideoEditor videos={editingTour.video_urls} onChange={(videos) => updateField("video_urls", videos)} />
        </section>

        {/* Section 4: Particulars */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black">04</div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em]">Tour Particulars</h3>
          </div>
          <div className="space-y-16">
            <ListEditor label="Key Highlights" items={editingTour.highlights} onChange={(items) => updateField("highlights", items)} />
            <ListEditor label="Trip Inclusions" items={editingTour.inclusions} onChange={(items) => updateField("inclusions", items)} />
            <ListEditor label="Exclusions" items={editingTour.exclusions} onChange={(items) => updateField("exclusions", items)} />
            <ListEditor label="Must Know Info" items={editingTour.know_before_you_go} onChange={(items) => updateField("know_before_you_go", items)} />
          </div>
        </section>

        {/* Section 5: Experience */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black">05</div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em]">Guest Experience</h3>
          </div>
          <DaysBreakdownEditor items={editingTour.days_breakdown} onChange={(items) => updateField("days_breakdown", items)} />
          <ItineraryEditor items={editingTour.itinerary} onChange={(items) => updateField("itinerary", items)} />
        </section>
      </div>
    </div>
  )

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">Tours</h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">Orchestrate your travel experiences.</p>
        </div>
        <button onClick={handleAddTour} className="btn-admin btn-admin-primary !rounded-2xl !py-5 !px-10 shadow-2xl shadow-black/10 hover:scale-105 transition-all">
          <Plus size={24} /> New Destination
        </button>
      </div>

      {message && (
        <div className={`admin-message ${message.type === "success" ? "admin-message--success" : "admin-message--error"} !rounded-3xl !py-6 !px-8 shadow-xl shadow-black/5`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="table-container">
          <table className="w-full text-left table-responsive">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-10 py-8">Experience</th>
                <th className="px-10 py-8">Location</th>
                <th className="px-10 py-8">Valuation</th>
                <th className="px-10 py-8 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50/40 transition-all group">
                  <td className="px-10 py-8">
                    <div className="font-black text-lg text-gray-900 group-hover:text-black transition-colors">{tour.title}</div>
                    <div className="text-[10px] text-gray-300 mt-1 font-bold tracking-widest">{tour.slug}</div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2.5 text-sm font-bold text-gray-500">
                      <MapPin size={16} className="text-gray-400" />
                      {tour.location}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="text-lg font-black text-black">{tour.currency} {tour.price_with_flight || tour.price_without_flight}</div>
                    <div className="text-[10px] text-gray-400 mt-1 font-bold">{tour.duration_days} Days / {tour.duration_nights} Nights</div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex justify-end gap-3 transition-all">
                      <a href={`/tours/${tour.slug}`} target="_blank" className="p-3 bg-gray-50 text-black rounded-2xl hover:bg-gray-100 transition-colors"><Eye size={20} /></a>
                      <button onClick={() => handleEdit(tour)} className="p-3 bg-gray-50 text-black rounded-2xl hover:bg-gray-100 transition-colors"><Pencil size={20} /></button>
                      <button onClick={() => tour.id && setDeleteModal({ isOpen: true, id: tour.id, title: tour.title })} className="p-3 bg-gray-50 text-black rounded-2xl hover:bg-gray-100 transition-colors"><Trash2 size={20} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })} 
        onConfirm={confirmDelete}
        title="Remove Destination?"
        message={`Are you sure you want to delete "${deleteModal.title}"? This cannot be undone.`}
      />
    </div>
  )
}
