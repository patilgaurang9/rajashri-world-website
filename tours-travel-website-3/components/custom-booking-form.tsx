"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


export function CustomBookingForm() {
  const [step, setStep] = useState(1)
  const [budget, setBudget] = useState([1000])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [destinations, setDestinations] = useState("")
  const [startDate, setStartDate] = useState("")
  const [duration, setDuration] = useState("")
  const [accommodation, setAccommodation] = useState("")
  const [travelers, setTravelers] = useState("")
  const [additional, setAdditional] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/custom-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          destinations,
          start_date: startDate,
          duration,
          budget: budget[0],
          accommodation,
          travelers: Number(travelers),
          additional_requirements: additional,
        })
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }
      setIsSubmitted(true)
      setDialogOpen(true)
      // Reset form fields
      setName("");
      setEmail("");
      setDestinations("");
      setStartDate("");
      setDuration("");
      setAccommodation("");
      setTravelers("");
      setAdditional("");
      setBudget([1000]);
      setStep(1);
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }



  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full px-0 md:px-4">
      {/* Progress Dots */}
      <div className="flex justify-center gap-3">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`w-4 h-4 rounded-full border-2 transition-colors
              ${step === s ? "bg-black border-black" : step > s ? "bg-black/70 border-black/70" : "border-gray-300 bg-white"}`}
          />
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <Input id="name" required className="bg-white border-gray-300 rounded-full h-12" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input id="email" type="email" required className="bg-white border-gray-300 rounded-full h-12" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinations" className="text-gray-700">Preferred Destinations</Label>
            <Textarea
              id="destinations"
              placeholder="Tell us about the places you'd like to visit..."
              className="bg-white border-gray-300 rounded-2xl"
              rows={3}
              value={destinations}
              onChange={e => setDestinations(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-gray-700">Travel Start Date</Label>
              <Input id="startDate" type="date" required className="bg-white border-gray-300 rounded-full h-12" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-gray-700">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-white border-gray-300 rounded-full h-12">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-5">3-5 days</SelectItem>
                  <SelectItem value="6-10">6-10 days</SelectItem>
                  <SelectItem value="11-15">11-15 days</SelectItem>
                  <SelectItem value="16+">16+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={() => setStep(2)} className="rounded-full px-6 py-3 bg-black hover:bg-black/90 text-white">
              Next
            </Button>
          </div>
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <div className="space-y-3">
            <Label className="text-gray-700">Budget Range (per person)</Label>
            <Slider value={budget} onValueChange={setBudget} max={500000} min={5000} step={1000} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹5,000</span>
              <span className="font-medium text-black">₹{budget[0].toLocaleString('en-IN')}</span>
              <span>₹5,00,000+</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Accommodation Type</Label>
            <Select value={accommodation} onValueChange={setAccommodation}>
              <SelectTrigger className="bg-white border-gray-300 rounded-full h-12">
                <SelectValue placeholder="Select accommodation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (Hostels, Budget Hotels)</SelectItem>
                <SelectItem value="standard">Standard (3-star Hotels)</SelectItem>
                <SelectItem value="luxury">Luxury (4-5 star Hotels)</SelectItem>
                <SelectItem value="premium">Premium (Resorts, Villas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers" className="text-gray-700">Number of Travelers</Label>
            <Select value={travelers} onValueChange={setTravelers}>
              <SelectTrigger className="bg-white border-gray-300 rounded-full h-12">
                <SelectValue placeholder="Select number of travelers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Traveler" : "Travelers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional" className="text-gray-700">Additional Requirements</Label>
            <Textarea
              id="additional"
              placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
              className="bg-white border-gray-300 rounded-2xl"
              rows={4}
              value={additional}
              onChange={e => setAdditional(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" onClick={() => setStep(1)} variant="outline" className="rounded-full px-6 py-3 border-black text-black hover:bg-black hover:text-white" disabled={loading}>
              Back
            </Button>
            <Button
              type="submit"
              className="bg-black hover:bg-black/90 text-white text-lg px-6 py-3 shadow-lg rounded-full"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </>
      )}
    {error && <div className="text-red-500 text-center text-sm mb-2">{error}</div>}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="rounded-3xl border border-gray-200 p-6">
        <DialogHeader>
          <DialogTitle>Request Submitted</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          <p className="text-gray-700 mb-6 text-center">We will contact you soon with your custom tour plan.</p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setDialogOpen(false);
              setIsSubmitted(false);
            }}
            className="rounded-full px-6 py-3 bg-black hover:bg-black/90 text-white w-full"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </form>
  )
}
