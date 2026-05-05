"use client"

import { useState, useEffect } from "react"
import { X, Send, Calendar, User, Phone, Mail, Sparkles, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Form State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const startTimer = () => {
      return setTimeout(() => {
        const seenAt = localStorage.getItem("enquiry_popup_seen_at")
        const now = new Date().getTime()
        const fiveHours = 5 * 60 * 60 * 1000

        if (!seenAt || (now - parseInt(seenAt)) > fiveHours) {
          setIsOpen(true)
        }
      }, 15000)
    }

    let timerId: NodeJS.Timeout

    const handleReelFinished = () => {
      timerId = startTimer()
    }

    window.addEventListener("reel-finished", handleReelFinished)

    return () => {
      window.removeEventListener("reel-finished", handleReelFinished)
      if (timerId) clearTimeout(timerId)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setSuccess(false)
    localStorage.setItem("enquiry_popup_seen_at", new Date().getTime().toString())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          tour_name: "General Inquiry (Popup)",
          message: "User requested a callback via welcome popup."
        })
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          handleClose()
        }, 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen && !success) return null

  return (
    <Dialog open={isOpen || success} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-[95vw] w-full sm:max-w-[450px] p-0 overflow-hidden border-none bg-white rounded-[3rem] shadow-3xl">
        <DialogTitle className="sr-only">Quick Inquiry Form</DialogTitle>
        <div className="relative">
          {/* Header Image/Pattern */}
          <div className="h-32 bg-slate-900 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-2">
                <Sparkles size={10} />
                Exclusive Trip
              </div>
              <h2 className="text-white text-2xl font-black tracking-tight">Plan Your Dream Trip</h2>
            </div>
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8">
            {success ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Inquiry Received!</h3>
                <p className="text-slate-500 font-medium">Our travel expert will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-slate-500 text-sm font-medium text-center mb-6 leading-relaxed px-4">
                  Fill in your details below and our experts will reach out to craft the perfect itinerary for you.
                </p>

                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-600/20 font-bold text-slate-900 transition-all"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-600/20 font-bold text-slate-900 transition-all"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-600/20 font-bold text-slate-900 transition-all"
                      required
                    />
                  </div>
                </div>

                <Button
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-base shadow-xl shadow-slate-900/10 mt-6"
                >
                  {loading ? "Sending..." : "Request a Callback"}
                </Button>
                
                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest mt-4">
                  100% Free Consultation • No Hidden Fees
                </p>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
