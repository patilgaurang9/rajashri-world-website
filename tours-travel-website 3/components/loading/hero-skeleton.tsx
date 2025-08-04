import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-slate-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80" />
      </div>

      {/* Content Skeleton */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="space-y-6 mb-8">
          <Skeleton className="h-16 md:h-20 w-full max-w-4xl mx-auto rounded-2xl" />
          <Skeleton className="h-16 md:h-20 w-3/4 max-w-3xl mx-auto rounded-2xl" />
        </div>

        <div className="space-y-4 mb-8">
          <Skeleton className="h-6 w-full max-w-3xl mx-auto rounded-lg" />
          <Skeleton className="h-6 w-4/5 max-w-2xl mx-auto rounded-lg" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Skeleton className="h-14 w-40 rounded-full" />
          <Skeleton className="h-14 w-40 rounded-full" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="text-center">
              <Skeleton className="h-10 w-16 mx-auto mb-2 rounded-lg" />
              <Skeleton className="h-4 w-20 mx-auto rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
