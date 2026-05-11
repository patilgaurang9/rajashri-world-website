"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Send } from "lucide-react"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsSubmitted(true)
    }, 800)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-xs">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 font-semibold"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-0.5 bg-orange-600 rounded-full" />
          <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Message Us</span>
        </div>
        <h2 className="text-xl font-black text-slate-900">Send a Message</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">First Name</Label>
            <Input
              id="firstName"
              required
              placeholder="Raj"
              className="bg-slate-50 border-slate-200 rounded-xl h-11 text-sm focus-visible:ring-orange-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Last Name</Label>
            <Input
              id="lastName"
              required
              placeholder="Sharma"
              className="bg-slate-50 border-slate-200 rounded-xl h-11 text-sm focus-visible:ring-orange-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="bg-slate-50 border-slate-200 rounded-xl h-11 text-sm focus-visible:ring-orange-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 99999 99999"
            className="bg-slate-50 border-slate-200 rounded-xl h-11 text-sm focus-visible:ring-orange-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Subject</Label>
          <Input
            id="subject"
            required
            placeholder="Tour enquiry, Custom booking..."
            className="bg-slate-50 border-slate-200 rounded-xl h-11 text-sm focus-visible:ring-orange-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Message</Label>
          <Textarea
            id="message"
            required
            placeholder="Tell us about your travel plans or questions..."
            className="bg-slate-50 border-slate-200 rounded-xl text-sm focus-visible:ring-orange-500 resize-none"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-black hover:bg-black/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
