"use client"

import { useState, useEffect } from "react"
import { Play, ChevronRight, Video, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GalleryVideo {
  id: string
  title: string
  video_url: string
  thumbnail_url?: string
}

export function VideoGallerySection() {
  const [videos, setVideos] = useState<GalleryVideo[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/gallery")
        const { data } = await res.json()
        if (data) setVideos(data.slice(0, 4))
      } catch (err) {
        console.error("Failed to fetch gallery videos:", err)
      }
    }
    fetchVideos()
  }, [])

  return (
    <section className="bg-white">
      <div className="bg-[#FFF8F1] relative overflow-hidden pt-12 pb-12">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -z-10 -mr-48 -mt-48" />

        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
                <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Cinematic</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Journey Through <span className="text-orange-600">Our Lens</span>
              </h2>
            </div>
            <Link 
              href="/gallery" 
              className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20"
            >
              Explore Gallery
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile: horizontal scroll — Desktop: grid */}
          {/* Mobile scroll strip */}
          <div className="md:hidden -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {videos.length === 0
                ? [1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-none w-[72vw] aspect-[4/5] rounded-[2rem] bg-orange-100/20 animate-pulse border border-orange-100/30 snap-start" />
                  ))
                : videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex-none w-[72vw] relative group cursor-pointer snap-start"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl">
                        <video
                          src={`${video.video_url}#t=0.5`}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                            <Play className="text-white fill-white ml-1" size={16} />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-white font-black text-base leading-tight">{video.title}</h3>
                          <div className="flex items-center gap-1.5 text-white/60 text-[9px] font-black uppercase tracking-widest mt-1">
                            <Video size={9} />
                            Rajashri World Original
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              {/* trailing spacer so last card doesn't flush to edge */}
              <div className="flex-none w-2 shrink-0" />
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.length === 0 ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-orange-100/20 animate-pulse border border-orange-100/30" />
              ))
            ) : (
              videos.map((video) => (
                <div
                  key={video.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedVideo(video)}
                  onDoubleClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                    <div className="w-full h-full relative">
                      <video
                        src={`${video.video_url}#t=0.5`}
                        autoPlay={hoveredId === video.id}
                        muted
                        loop
                        playsInline
                        className={`w-full h-full object-cover transition-opacity duration-700 ${hoveredId === video.id ? 'opacity-100' : 'opacity-80'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredId === video.id ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                        <Play className="text-white fill-white ml-1" size={20} />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500">
                      <h3 className="text-white font-black text-lg leading-tight mb-2 group-hover:text-orange-400 transition-colors tracking-tight">{video.title}</h3>
                      <div className="flex items-center gap-2 text-white/60 text-[9px] font-black uppercase tracking-widest">
                        <Video size={10} />
                        Rajashri World Original
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>


      {/* Video Popup Modal */}
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
                  Official Reel
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
