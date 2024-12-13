"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import PropertyCard from "@/components/cards/PropertyCard"
import PropertySkeleton from "@/components/skeletons/PropertySkeleton"
import PageHero from '@/components/ui/PageHero'
import { Toast } from "@/components/ui/Toast"
import { fetchFilteredProperties } from '@/utils/fetch/propertyService'
import getUser from '@/utils/getUser'

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [propertyType, setPropertyType] = useState('Alle')
  const [priceRange, setPriceRange] = useState(12000000)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const handleToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
  }

  const propertyTypes = [
    { value: 'Alle', label: 'Alle typer' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Landejendom', label: 'Landejendom' },
    { value: 'Ejerlejlighed', label: 'Ejerlejlighed' },
    { value: 'Byhus', label: 'Byhus' }
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [propertiesData, userData] = await Promise.all([
          fetchFilteredProperties({ priceRange: [0, priceRange], propertyType }),
          getUser()
        ])
        setProperties(propertiesData)
        setFavorites(userData?.homes || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [priceRange, propertyType])

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value)
  }

  return (
    <>
      <PageHero 
        title="Boliger til salg"
        backgroundImage="/images/boliger-hero.png"
      />

      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-1/3">
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                Søg efter dit drømmehus
              </label>
              <select 
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                aria-label="Vælg boligtype"
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-1/3">
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                Prisrange
              </label>
              <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                  <span>Max: {priceRange}</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="12000000"
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 flex-grow py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(6)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Viser {properties.length} {properties.length === 1 ? 'bolig' : 'boliger'}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {properties.map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    index={index}
                    initialFavorites={favorites}
                    onToast={handleToast}
                    onFavoriteChange={(newFavorites) => setFavorites(newFavorites)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
              {toast.show && (
                <Toast
                  message={toast.message}
                  type={toast.type}
                  isVisible={toast.show}
                  onClose={() => setToast({ ...toast, show: false })} 
                  onToast={handleToast}
                />
              )}
            </AnimatePresence>
          </div>
      </div>
    </>
  )
}