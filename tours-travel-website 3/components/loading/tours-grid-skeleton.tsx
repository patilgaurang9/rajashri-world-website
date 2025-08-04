import { TourCardSkeleton } from "./tour-card-skeleton"

export function ToursGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-slate-700/50 rounded-lg animate-pulse" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <TourCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
