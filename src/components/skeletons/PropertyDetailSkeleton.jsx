import { Skeleton } from "@/components/ui/skeleton"

export function PropertySkeleton() {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Hero Image Skeleton */}
      <div className="relative w-full h-[500px] mb-6">
        <Skeleton className="w-full h-full rounded-lg" />
        <Skeleton className="w-full h-full rounded-lg" />
        <Skeleton className="w-full h-full rounded-lg" />
        {/* Image Controls */}
        <div className="flex gap-4 justify-end mt-4">
          {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="w-12 h-12 rounded-lg" />
        ))}
        </div>
      </div>

      {/* Property Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-8 w-48 ml-auto" />
          <Skeleton className="h-8 w-48 ml-auto" />
          <Skeleton className="h-8 w-48 ml-auto" />
          <Skeleton className="h-6 w-40 ml-auto" />
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-3 gap-x-16 gap-y-4 mb-12">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Description and Agent Section */}
      <div className="flex justify-between">
        {/* Description Section */}
        <div className="flex flex-col w-1/2">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        {/* Agent Section */}
        <div className="flex flex-col w-1/2">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="flex gap-6 border-2 border-shape-shape01 p-8 h-[80%]">
            {/* Agent Image */}
            <div className="relative w-64 h-64 mb-[2.35rem]">
              <Skeleton className="w-full h-full" />
              {/* Social Icons */}
              <Skeleton className="absolute bottom-[-2.35rem] w-32 h-10" />
            </div>
            {/* Agent Details */}
            <div className="flex flex-col justify-around h-2/3 space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-0.5 w-16" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-48" />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

