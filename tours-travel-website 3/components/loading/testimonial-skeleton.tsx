import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TestimonialSkeleton() {
  return (
    <Card className="bg-white border-gray-200 shadow-lg rounded-2xl">
      <CardContent className="p-8 md:p-12">
        <div className="text-center">
          <div className="flex justify-center mb-4 gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>

          <div className="space-y-4 mb-8">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-5/6 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-4/5 mx-auto rounded-lg" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-15 w-15 rounded-full" />
            <div className="text-left space-y-2">
              <Skeleton className="h-5 w-32 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
