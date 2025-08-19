import { BookingFormSkeleton } from "@/components/loading/booking-form-skeleton"

export default function BookingLoading() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-slate-900">
      <BookingFormSkeleton />
    </div>
  )
}
