export default function FavoritsCardSkeleton() {
  return (
    <div className="lg:w-[60rem] md:w-[30rem] sm:w-fit border rounded-lg overflow-hidden p-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-48 h-32 bg-gray-200 rounded-md animate-pulse" />
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
  
  