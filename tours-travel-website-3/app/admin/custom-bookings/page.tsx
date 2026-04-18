"use client"

import { useEffect, useState } from "react"
import { FileText, Mail, Calendar, Users, MapPin, DollarSign, Clock, ChevronDown, ChevronUp, Search, Info } from "lucide-react"

interface CustomBooking {
  id: string
  created_at: string
  name: string
  email: string
  destinations: string
  start_date: string
  duration: string
  budget: string
  accommodation: string
  activities: string
  travelers: string
  additional_requirements: string
  status: string
  updated_at: string
}

export default function AdminCustomBookingsPage() {
  const [bookings, setBookings] = useState<CustomBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch("/api/admin/custom-bookings", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.bookings) setBookings(data.bookings)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.destinations.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—"
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Bookings</h1>
          <p className="text-gray-500">Tailor-made tour requests from customers</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search bookings..."
            className="admin-input !pl-10 !w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-500">Loading custom requests...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <FileText size={48} className="text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400">No custom bookings found</h3>
            <p className="text-gray-500 text-sm">Requests for custom tours will appear here.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const isExpanded = expandedId === booking.id
            return (
              <div 
                key={booking.id} 
                className={`bg-white rounded-2xl border transition-all duration-200 ${isExpanded ? 'border-black shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'}`}
              >
                <div 
                  className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-gray-900">{booking.name}</h3>
                      <span className={`admin-badge ${booking.status === 'Confirmed' ? 'admin-badge-blue' : 'admin-badge-orange'}`}>
                        {booking.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1"><MapPin size={14} /> {booking.destinations}</div>
                      <div className="flex items-center gap-1"><Calendar size={14} /> {formatDate(booking.start_date)}</div>
                      <div className="flex items-center gap-1"><Users size={14} /> {booking.travelers} travelers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className="text-xs text-gray-400">Budget Estimate</div>
                      <div className="font-bold text-gray-900">{booking.budget || '—'}</div>
                    </div>
                    <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'}`}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail size={14} className="text-gray-400" />
                            <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">{booking.email}</a>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trip Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div><span className="text-gray-400">Duration:</span> {booking.duration}</div>
                          <div><span className="text-gray-400">Accommodation:</span> {booking.accommodation}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Submission Details</h4>
                        <div className="text-sm text-gray-500">
                          Received on {new Date(booking.created_at).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-6">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                          <Info size={14} /> Activities Interest
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {booking.activities || "No specific activities mentioned."}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Additional Requirements</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {booking.additional_requirements || "No additional requirements provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
