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
      <Card className="bg-white border-gray-200 shadow-lg rounded-2xl">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold mb-4 text-green-600">Message Sent!</h2>
          <p className="text-gray-700 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-gray-200 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input id="firstName" required className="bg-white border-gray-300 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input id="lastName" required className="bg-white border-gray-300 rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input id="email" type="email" required className="bg-white border-gray-300 rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-700">Subject</Label>
            <Input id="subject" required className="bg-white border-gray-300 rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-700">Message</Label>
            <Textarea
              id="message"
              required
              placeholder="Tell us how we can help you..."
              className="bg-white border-gray-300 rounded-xl"
              rows={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-6 shadow-lg rounded-full"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
