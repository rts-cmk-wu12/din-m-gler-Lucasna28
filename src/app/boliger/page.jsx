"use client"
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import PropertyCard from "@/components/cards/PropertyCard"
import PropertySkeleton from "@/components/skeletons/PropertySkeleton"
import PageHero from '@/components/ui/PageHero'
import { fetchFilteredProperties } from '@/utils/fetch/propertyService'

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [propertyType, setPropertyType] = useState('Alle')
  const [maxPrice, setMaxPrice] = useState(12000000)

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const propertyTypes = [
    { value: 'Alle', label: 'Alle typer' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Landejendom', label: 'Landejendom' },
    { value: 'Ejerlejlighed', label: 'Ejerlejlighed' },
    { value: 'Byhus', label: 'Byhus' }
  ]

  useEffect(() => {
    const getProperties = async () => {
      setIsLoading(true)
      try {
        const data = await fetchFilteredProperties({ 
          priceRange: [0, maxPrice], 
          propertyType 
        })
        setProperties(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getProperties()
  }, [maxPrice, propertyType])

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

            <div className="w-full md:w-2/3">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Maksimal pris
              </label>
              <div className="space-y-4">
                <input
                  id="maxPrice"
                  type="range"
                  min="0"
                  max="12000000"
                  step="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full"
                  aria-label="Maksimal pris"
                />
                <div className="flex justify-end text-sm text-gray-600">
                  <span>Maksimalpris: {formatPrice(maxPrice)} kr.</span>
                </div>
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
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}