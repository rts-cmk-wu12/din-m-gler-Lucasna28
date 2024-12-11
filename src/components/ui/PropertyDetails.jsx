'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import MapComponent from '@/components/map/MapComponent'
import { Toast } from './Toast'

export function PropertyDetails({ exteriorImages, floorplanImages, property, initialFavorited, propertyId }) {
  const [activeView, setActiveView] = useState('exterior')
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const router = useRouter()

  const handleFavoriteClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const previousState = isFavorited;
    setIsFavorited(!previousState); // Optimistic update

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
        setToast({
          show: true,
          message: 'Du skal være logget ind for at tilføje favoritter',
          type: 'error'
        });
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }
      
      if (!response.ok) throw new Error(data.message)
      
      setToast({
        show: true,
        message: data.isFavorited 
          ? `${property.type} på ${property.adress1} er føjet til dine favoritter ❤️`
          : `${property.type} på ${property.adress1} er fjernet fra dine favoritter`,
        type: 'success'
      });
      
    } catch (error) {
      setIsFavorited(previousState);
      setToast({
        show: true,
        message: 'Der opstod en fejl. Prøv igen senere',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
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
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              isVisible={toast.show}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
    </div>
  )
}
