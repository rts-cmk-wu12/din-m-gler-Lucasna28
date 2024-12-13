"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProperties } from "@/hooks/useProperties"
import Link from "next/link"
import PropertySkeleton from "@/components/skeletons/PropertySkeleton"
import PropertyCard from "@/components/cards/PropertyCard"
import { Toast } from "@/components/ui/Toast"
import getUser from "@/utils/getUser"

export default function FeaturedProperties() {
  const { properties, isLoading, error } = useProperties()
  const [favorites, setFavorites] = useState([])
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const handleToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser()
      setFavorites(userData?.homes || [])
    }

    fetchUserData()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#162A41] mb-4">Udvalgte Boliger</h2>
          <p className="text-gray-600">
            Se vores udvalg af boliger til salg - eller find lige præcis den bolig du søger
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <PropertySkeleton key={index} />
            ))
          ) : (
            properties.slice(0, 4).map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                index={index}
                initialFavorites={favorites}
                onToast={handleToast}
                onFavoriteChange={(newFavorites) => setFavorites(newFavorites)}
              />
            ))
          )}
        </div>
      </div>
      <Link 
        href="/boliger"
        className="flex bg-primary-color01 justify-center mt-8 text-white rounded-md w-28 text-nowrap text-center p-4 mx-auto"
      >
        Se alle boliger
      </Link>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              isVisible={toast.show}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}