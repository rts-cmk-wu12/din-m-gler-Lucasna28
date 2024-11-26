"use client"
import { useState } from 'react'
import PropertyCard from "@/components/cards/PropertyCard"
import { useProperties } from "@/hooks/useProperties"
import PropertySkeleton from "@/components/skeletons/PropertySkeleton"

export default function PropertiesPage() {
  const { properties, isLoading, error } = useProperties()
  const [propertyType, setPropertyType] = useState('Ejendomstype')
  const [priceRange, setPriceRange] = useState([0, 12000000])

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      {/* Hero sektion med titel */}
      <div className="bg-primary-color01 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Boliger til salg</h1>
        </div>
      </div>

      {/* Filtreringssektion */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Søg efter dit drømmehus
              </label>
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="Ejendomstype">Ejendomstype</option>
                <option value="Villa">Villa</option>
                <option value="Lejlighed">Lejlighed</option>
                <option value="Rækkehus">Rækkehus</option>
              </select>
            </div>

            <div className="w-full md:w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pris interval
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="12000000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <span className="whitespace-nowrap">
                  {formatPrice(priceRange[0])} kr. - {formatPrice(priceRange[1])} kr.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Boligliste */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {properties.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
