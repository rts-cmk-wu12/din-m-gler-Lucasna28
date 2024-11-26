"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PropertyDetailPage() {
  const [property, setProperty] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://dinmaegler.onrender.com/homes/${params.id}`)
        if (!response.ok) {
          throw new Error('Kunne ikke hente boligdata')
        }
        const data = await response.json()
        setProperty(data)
      } catch (err) {
        setError('Der skete en fejl ved indlæsning af boligen')
        console.error('Fejl:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded-lg mb-8" />
          <div className="h-8 bg-gray-200 w-2/3 mb-4" />
          <div className="h-4 bg-gray-200 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    )
  }

  if (!property) return null

  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] w-full"
      >
        <Image
          src={property.images[0].url}
          alt={property.adress1}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white -mt-20 relative z-10 rounded-lg shadow-xl p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.adress1}</h1>
              <p className="text-gray-600">{property.zipcode} {property.city}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-color01">
                Kr. {property.price.toLocaleString()}
              </div>
              <div className="text-gray-600">
                Udbetaling: Kr. {property.payment.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="p-4 bg-gray-50 rounded">
              <div className="font-semibold">Boligareal</div>
              <div>{property.gross} m²</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="font-semibold">Værelser</div>
              <div>{property.rooms}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="font-semibold">Energimærke</div>
              <div>{property.energylabel}</div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Beskrivelse</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 