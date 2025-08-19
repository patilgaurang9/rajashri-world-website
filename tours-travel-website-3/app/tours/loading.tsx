import { ToursGridSkeleton } from "@/components/loading/tours-grid-skeleton"

export default function ToursLoading() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-12 bg-slate-700/50 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-slate-700/50 rounded-lg w-96 mx-auto animate-pulse" />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border-slate-700/50 rounded-lg p-6 space-y-6">
              <div className="h-6 bg-slate-700/50 rounded animate-pulse" />
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="h-4 bg-slate-700/50 rounded animate-pulse" />
                  <div className="h-10 bg-slate-700/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <ToursGridSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
