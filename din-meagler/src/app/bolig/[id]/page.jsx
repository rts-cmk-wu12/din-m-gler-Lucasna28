'use client'

import { useProperty } from '@/hooks/useProperties'
import { useParams } from 'next/navigation'
import Image from "next/image"
import { ImageIcon, LayersIcon, MapPinIcon, HeartIcon, Phone, Mail, Instagram, Linkedin, Globe, Loader2 } from 'lucide-react'
import { useState } from 'react'

// Tilføj PlaceholderImage komponent
function PlaceholderImage({ className }) {
  return (
    <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  )
}

export default function PropertyListing() {
  const { id } = useParams()
  const { property, isLoading, error } = useProperty(id)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('exterior') // 'exterior' | 'floorplan'
  
  // Opdel billeder i kategorier
  const exteriorImages = property?.images?.filter(img => !img.url.includes('floorplan')) || []
  const floorplanImages = property?.images?.filter(img => img.url.includes('floorplan')) || []
  
  console.log('Eksteriør billeder:', exteriorImages)
  console.log('Plantegninger:', floorplanImages)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <PlaceholderImage className="w-20 h-20" />
      </div>
    )
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Fejl: {error}</div>
  }

  if (!property) {
    return <div className="container mx-auto px-4 py-8">Boligen blev ikke fundet.</div>
  }

  // Vælg den aktive billedsamling baseret på kategori
  const activeImages = activeCategory === 'exterior' ? exteriorImages : floorplanImages

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Image Slideshow */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        {activeImages[activeImageIndex]?.url ? (
          <Image
            src={activeImages[activeImageIndex].url}
            alt={`${property.type} ${activeCategory === 'exterior' ? 'billede' : 'plantegning'} ${activeImageIndex + 1}`}
            fill
            className="object-cover"
          />
        ) : (
          <PlaceholderImage className="w-full h-full" />
        )}
        
        {/* Slideshow Navigation */}
        {activeImages.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {activeImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Previous/Next Buttons */}
        {activeImages.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1))}
            >
              ←
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
              onClick={() => setActiveImageIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1))}
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Property Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">{property.adress1}</h1>
          <p className="text-muted-foreground">{property.zipcode} {property.city}</p>
        </div>
        <div className="text-3xl font-bold mt-4 md:mt-0">Kr. {property.price?.toLocaleString()}</div>
      </div>

      {/* Category Selection Icons */}
      <div className="flex justify-center gap-8 mb-8">
        <button
          className={`p-2 hover:bg-accent rounded-full transition-colors flex flex-col items-center gap-2 ${
            activeCategory === 'exterior' ? 'bg-accent' : ''
          }`}
          onClick={() => {
            setActiveCategory('exterior')
            setActiveImageIndex(0)
          }}
        >
          <ImageIcon className="w-6 h-6" />
          <span className="text-sm">Billeder ({exteriorImages.length})</span>
        </button>
        <button
          className={`p-2 hover:bg-accent rounded-full transition-colors flex flex-col items-center gap-2 ${
            activeCategory === 'floorplan' ? 'bg-accent' : ''
          }`}
          onClick={() => {
            setActiveCategory('floorplan')
            setActiveImageIndex(0)
          }}
        >
          <LayersIcon className="w-6 h-6" />
          <span className="text-sm">Plantegninger ({floorplanImages.length})</span>
        </button>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <DetailItem label="Sagsnummer" value={property.id?.toString() || '-'} />
        <DetailItem label="Kælder" value={property.basement ? `${property.basement} m²` : '-'} />
        <DetailItem label="Udbetaling" value={`Kr. ${Math.round((property.price || 0) * 0.05).toLocaleString()}`} />
        <DetailItem label="Boligareal" value={property.gross ? `${property.gross} m²` : '-'} />
        <DetailItem label="Byggeår" value={property.built?.toString() || '-'} />
        <DetailItem label="Brutto ex ejerudgift" value={property.payment ? `Kr. ${property.payment.toLocaleString()}` : '-'} />
        <DetailItem label="Grundareal" value={property.ground ? `${property.ground} m²` : '-'} />
        <DetailItem label="Ombygget" value={property.remodel || '-'} />
        <DetailItem label="Netto ex ejerudgift" value={property.net ? `Kr. ${property.net.toLocaleString()}` : '-'} />
        <DetailItem label="Rum/værelser" value={property.rooms?.toString() || '-'} />
        <DetailItem label="Energimærke" value={property.energylabel || '-'} />
        <DetailItem label="Ejerudgifter" value={property.cost ? `Kr. ${property.cost.toLocaleString()}` : '-'} />
        <DetailItem label="Antal Plan" value={property.floors?.toString() || '-'} />
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Beskrivelse</h2>
        <p className="text-muted-foreground">{property.description}</p>
      </div>

      {/* Agent Section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Ansvarig mægler</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-48 h-48 rounded-lg overflow-hidden">
              {property.agent?.image ? (
                <Image
                  src={property.agent.image}
                  alt={property.agent?.name || 'Ejendomsmægler'}
                  fill
                  className="object-cover"
                />
              ) : (
                <PlaceholderImage className="w-full h-full" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{property.agent?.name || 'Ejendomsmægler'}</h3>
              <p className="text-muted-foreground mb-4">{property.agent?.title || 'Ejendomsmægler'}</p>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-start gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  {property.agent?.phone || '-'}
                </button>
                <button className="w-full flex items-center justify-start gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4" />
                  {property.agent?.email || '-'}
                </button>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="p-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <Instagram className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded-md hover:bg-gray-50 transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

