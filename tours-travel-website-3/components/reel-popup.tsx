"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Volume2, VolumeX, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ReelPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [reelUrl, setReelUrl] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await fetch("/api/reels", { cache: 'no-store' })
        const { data } = await res.json()
        
        if (Array.isArray(data) && data.length > 0) {
          const latestReel = data[0]
          setReelUrl(latestReel.video_url)
          
          const closedAt = localStorage.getItem("welcome_reel_closed_at")
          const now = new Date().getTime()
          const fiveHours = 5 * 60 * 60 * 1000

          if (!closedAt || (now - parseInt(closedAt)) > fiveHours) {
            setIsOpen(true)
          } else {
            window.dispatchEvent(new CustomEvent("reel-finished"))
          }
        } else {
          window.dispatchEvent(new CustomEvent("reel-finished"))
        }
      } catch (err) {
        console.error("Failed to fetch settings for reel popup:", err)
        window.dispatchEvent(new CustomEvent("reel-finished"))
      }
    }
    fetchReels()
  }, [])

  // Auto-play insurance
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Auto-play prevented, waiting for interaction", err)
      })
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("welcome_reel_closed_at", new Date().getTime().toString())
    window.dispatchEvent(new CustomEvent("reel-finished"))
  }

  if (!reelUrl) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-[95vw] w-fit sm:max-w-[400px] p-0 overflow-hidden border-0 bg-transparent shadow-none focus:outline-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Welcome Promotional Reel</DialogTitle>
        </DialogHeader>
        
        <div className="relative aspect-[9/16] w-full max-h-[85vh] rounded-[32px] overflow-hidden shadow-2xl bg-black group animate-in fade-in zoom-in duration-500">
          <video 
            ref={videoRef}
            src={reelUrl} 
            autoPlay 
            loop 
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
          >
            <X size={20} />
          </button>

          {/* Mute/Unmute Toggle */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-6 right-6 z-50 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          {/* Call to Action or Text */}
          <div className="absolute bottom-8 left-8 right-16 pointer-events-none">
            <h3 className="text-white font-black text-xl leading-tight">
              Welcome to <br />
              <span className="text-orange-400">Rajashri World</span>
            </h3>
            <p className="text-white/70 text-xs mt-2 font-medium uppercase tracking-widest">Special Offers Inside</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
