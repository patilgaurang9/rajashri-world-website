"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="bg-white border-gray-200 shadow-md rounded-2xl h-full">
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-bold mb-2 text-green-600">Message Sent!</h2>
          <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-black text-black hover:bg-black hover:text-white rounded-full">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
      <Card className="bg-white border-gray-200 shadow-md rounded-2xl h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-900 tracking-tight">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input id="firstName" required className="bg-white border-gray-300 rounded-full h-11" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input id="lastName" required className="bg-white border-gray-300 rounded-full h-11" />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input id="email" type="email" required className="bg-white border-gray-300 rounded-full h-11" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="subject" className="text-gray-700">Subject</Label>
            <Input id="subject" required className="bg-white border-gray-300 rounded-full h-11" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="message" className="text-gray-700">Message</Label>
            <Textarea
              id="message"
              required
              placeholder="How can we help you?"
              className="bg-white border-gray-300 rounded-2xl"
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-black/90 text-white text-base py-4 shadow rounded-full font-semibold tracking-wide transition-colors"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
