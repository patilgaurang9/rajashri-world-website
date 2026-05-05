"use client"

import { useState, useEffect } from "react"
import { Play, X, Video, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GalleryVideo {
  id: string
  title: string
  video_url: string
  thumbnail_url?: string
  created_at: string
}

export default function GalleryPage() {
  const [videos, setVideos] = useState<GalleryVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/gallery")
        const { data } = await res.json()
        if (data) setVideos(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50/30 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Cinematic <br />
            <span className="text-orange-600">Travel Gallery</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Experience the magic of India through our carefully curated video collection. From hidden gems to iconic landmarks.
          </p>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[9/16] bg-slate-200 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videos.map((video) => (
              <div 
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                onDoubleClick={() => setSelectedVideo(video)}
                className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-black shadow-xl cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-600/10"
              >
                <video 
                  src={video.video_url} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
                  muted
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-4 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-500">
                    <Play className="text-white fill-white ml-0.5" size={20} />
                  </div>
                  <h3 className="text-white font-black text-2xl leading-tight mb-2 uppercase tracking-tighter">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                    <Video size={12} />
                    {new Date(video.created_at).getFullYear()} Collection
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal - Premium Reel Style */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-[100vw] w-screen h-screen p-0 border-0 bg-black/95 backdrop-blur-2xl transition-all duration-500 overflow-hidden flex items-center justify-center">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div className="relative w-full max-w-[500px] aspect-[9/16] h-fit max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl bg-black animate-in zoom-in-95 duration-500">
              <video 
                src={selectedVideo.video_url} 
                autoPlay 
                controls 
                className="w-full h-full object-cover"
              />
              {/* Close Button - Stories Style */}
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20"
              >
                <X size={24} />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                <h2 className="text-white font-black text-2xl uppercase tracking-tighter mb-2">{selectedVideo.title}</h2>
                <div className="flex items-center gap-2 text-white/50 text-xs font-black uppercase tracking-widest">
                  <Video size={14} />
                  Rajashri World Original
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
