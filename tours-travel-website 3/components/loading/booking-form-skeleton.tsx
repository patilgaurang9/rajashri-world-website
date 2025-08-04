import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BookingFormSkeleton() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Form Skeleton */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>

          {/* Step 1 Skeleton */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="bg-slate-700/50">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="border-2 border-slate-600 rounded-xl p-4">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-3 w-12 mb-2" />
                    <Skeleton className="h-3 w-14 mb-1" />
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-3 w-20 mb-3" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 2 Skeleton */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="bg-slate-700/50">
              <Skeleton className="h-6 w-56" />
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Traveller counts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-3 w-16" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 Skeleton */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="bg-slate-700/50">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-64 mb-6" />
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-slate-600 pb-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-16" />
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 items-center py-4">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Button */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="p-3 rounded-lg border border-slate-600">
                <Skeleton className="h-6 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
