import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TourCardSkeleton() {
  return (
    <Card className="bg-white border-gray-200 shadow-lg rounded-2xl">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Skeleton className="w-full h-48" />
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>

      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2 rounded-lg" />
        <Skeleton className="h-4 w-full mb-1 rounded-lg" />
        <Skeleton className="h-4 w-2/3 mb-4 rounded-lg" />

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-lg" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-8 rounded-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-8 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
