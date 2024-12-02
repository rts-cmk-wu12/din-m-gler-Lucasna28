import { useState, useEffect } from 'react'
import Image from "next/image"
import { X, Image as ImageIcon, Map, Home, Heart } from 'lucide-react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
})

export default function ImageGallery({ property }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)
  const [activeView, setActiveView] = useState('exterior')
  const [mapKey, setMapKey] = useState(0)

  useEffect(() => {
    if (activeView === 'map') {
      setMapKey(prev => prev + 1)
    }
  }, [activeView, showLightbox])

  const views = {
    exterior: {
      images: property?.images || [],
      icon: <ImageIcon className="w-6 h-6" />,
      label: 'Billeder'
    },
    floorplan: {
      images: property?.floorplan ? [property.floorplan] : [],
      icon: <Home className="w-6 h-6" />,
      label: 'Plantegning'
    },
    map: {
      icon: <Map className="w-6 h-6" />,
      label: 'Kort'
    }
  }

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('lightbox-overlay')) {
      setShowLightbox(false)
    }
  }

  const handleNextImage = () => {
    if (activeView === 'exterior') {
      setActiveImageIndex((prev) => 
        prev === views.exterior.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const handlePrevImage = () => {
    if (activeView === 'exterior') {
      setActiveImageIndex((prev) => 
        prev === 0 ? views.exterior.images.length - 1 : prev - 1
      )
    }
  }

  const renderContent = () => {
    switch(activeView) {
      case 'map':
        return (
          <div className="h-full w-full relative" key={mapKey}>
            <MapComponent 
              position={[property?.lat || 55.676098, property?.long || 12.568337]}
              showFullscreen={showLightbox}
              zoom={showLightbox ? 15 : 13}
            />
            <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-lg shadow z-[400]">
              <p className="font-semibold">{property?.adress1}</p>
              <p className="text-sm text-gray-600">{property?.postalcode} {property?.city}</p>
            </div>
          </div>
        )
      case 'floorplan':
        return views.floorplan.images[0]?.url ? (
          <Image
            src={views.floorplan.images[0].url}
            alt="Plantegning"
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Ingen plantegning tilgængelig
          </div>
        )
      default:
        return views.exterior.images[activeImageIndex]?.url ? (
          <Image
            src={views.exterior.images[activeImageIndex].url}
            alt={`Boligbillede ${activeImageIndex + 1}`}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Ingen billeder tilgængelige
          </div>
        )
    }
  }

  return (
    <>
      <div className="relative w-full h-[500px] cursor-pointer" onClick={() => setShowLightbox(true)}>
        {renderContent()}
        
        {/* Billedtæller */}
        {activeView === 'exterior' && views.exterior.images.length > 0 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {activeImageIndex + 1} / {views.exterior.images.length}
          </div>
        )}
      </div>

      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center pt-[5vh] lightbox-overlay"
          onClick={handleClickOutside}
        >
          <div className="relative w-[90vw] h-[40vh]">
            {renderContent()}
            
            {/* Navigation pile for billeder */}
            {activeView === 'exterior' && views.exterior.images.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75"
                >
                  ←
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75"
                >
                  →
                </button>
              </>
            )}
            
            {/* Kontrol ikoner */}
            <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex gap-4">
              {Object.entries(views).map(([key, view]) => (
                <button 
                  key={key}
                  className={`text-white p-2 hover:bg-white/10 rounded flex items-center gap-2
                    ${activeView === key ? 'bg-white/20' : ''}`}
                  onClick={() => setActiveView(key)}
                >
                  {view.icon}
                  <span className="text-sm">{view.label}</span>
                </button>
              ))}
              <button className="text-white p-2 hover:bg-white/10 rounded flex items-center gap-2">
                <Heart className="w-6 h-6" />
                <span className="text-sm">Favorit</span>
              </button>
            </div>

            <button 
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  )
} 