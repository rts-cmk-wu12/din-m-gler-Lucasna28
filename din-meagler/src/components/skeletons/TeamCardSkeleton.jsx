import { motion } from 'framer-motion'

export default function TeamCardSkeleton() {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-[300px] bg-gray-200 animate-pulse" />
      <div className="p-6 text-center space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
        <div className="flex justify-center gap-4 pt-2">
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
} 