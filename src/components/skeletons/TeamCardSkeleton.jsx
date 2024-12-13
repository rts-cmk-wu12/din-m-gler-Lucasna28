import { motion } from 'framer-motion'

export default function TeamCardSkeleton() {
  return (
    <motion.div className="animate-pulse">
      <div className="bg-white rounded-lg overflow-hidden shadow">
        <div className="h-[300px] bg-gray-200" />
        <div className="p-6">
          <div className="h-4 bg-gray-200 w-1/2 mx-auto mb-2" />
          <div className="h-3 bg-gray-200 w-1/3 mx-auto mb-4" />
          <div className="flex justify-center gap-4">
            <div className="h-9 w-9 bg-gray-200 rounded" />
            <div className="h-9 w-9 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </motion.div>
  )
} 