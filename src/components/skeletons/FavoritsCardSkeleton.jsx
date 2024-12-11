export default function FavoritsCardSkeleton() {
    return (
      <div className="w-full border rounded-lg overflow-hidden p-4">
        <div className="flex items-center gap-4">
          <div className="w-48 h-32 bg-muted rounded-md animate-pulse" />
          <div className="flex-1 flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-56 bg-muted rounded animate-pulse" />
            </div>
            <div className="text-right">
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="w-36 h-10 bg-muted rounded animate-pulse" />
        </div>
      </div>
    )
  }
  
  