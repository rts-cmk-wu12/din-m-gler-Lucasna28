export default function PropertySkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="relative h-[300px] bg-gray-200" />
      <div className="p-6">
        {/* Adresse og by */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded-full w-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        
        {/* Postnummer og by */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        
        {/* Boligtype og ejerudgift */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded-full w-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        
        <div className="h-[1px] bg-gray-200 my-4"></div>
        
        {/* Bottom info */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-6 bg-gray-200 rounded w-12"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  )
} 