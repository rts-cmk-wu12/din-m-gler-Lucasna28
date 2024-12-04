'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import MapComponent from '@/components/map/MapComponent'

export function PropertyDetails({ exteriorImages, floorplanImages, property, initialFavorited, propertyId }) {
  const [activeView, setActiveView] = useState('exterior')
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('info')
  const router = useRouter()

  const handleFavoriteClick = async () => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId }),
      })
      
      const data = await response.json()
      
      if (response.status === 401) {
        setToastMessage('Du skal være logget ind for at tilføje favoritter')
        setToastType('error')
        setShowToast(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }
      
      if (!response.ok) throw new Error(data.message)
      
      setIsFavorited(data.isFavorited)
      setToastMessage(data.isFavorited ? 'Tilføjet til favoritter' : 'Fjernet fra favoritter')
      setToastType('success')
      setShowToast(true)
      
    } catch (error) {
      setToastMessage('Der opstod en fejl')
      setToastType('error')
      setShowToast(true)
    }
  }

  return (
    <div className="relative h-full">
      <div className="absolute inset-0">
        {activeView === 'exterior' && exteriorImages.length > 0 && (
          <Image
            src={exteriorImages[0].url}
            alt={exteriorImages[0].alt}
            fill
            className="object-cover"
          />
        )}
        {activeView === 'floorplan' && floorplanImages.length > 0 && (
          <Image
            src={floorplanImages[0].url}
            alt={floorplanImages[0].alt}
            fill
            className="object-contain"
          />
        )}
        {activeView === 'map' && (
          <MapComponent 
            latitude={property.latitude}
            longitude={property.longitude}
          />
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 flex gap-2 bg-white/80 p-2 rounded-lg">
        <button 
          onClick={() => setActiveView('exterior')}
          className={`p-2 rounded ${activeView === 'exterior' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          <Image src="/svg/images.svg" alt="Billeder" width={24} height={24} />
        </button>
        <button 
          onClick={() => setActiveView('floorplan')}
          className={`p-2 rounded ${activeView === 'floorplan' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          <Image src="/svg/plan.svg" alt="Plantegning" width={24} height={24} />
        </button>
        <button 
          onClick={() => setActiveView('map')}
          className={`p-2 rounded ${activeView === 'map' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          <Image src="/svg/location.svg" alt="Kort" width={24} height={24} />
        </button>
        <button 
          onClick={handleFavoriteClick}
          aria-label={isFavorited ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Image 
            src={isFavorited ? "/svg/heart-filled.svg" : "/svg/heart.svg"} 
            alt="" 
            width={24} 
            height={24} 
          />
        </button>
      </div>
      
      {showToast && (
        <div className={`toast ${toastType}`}>
          <div className="flex justify-between">
            <span>{toastMessage}</span>
            <button onClick={() => setShowToast(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  )
}
