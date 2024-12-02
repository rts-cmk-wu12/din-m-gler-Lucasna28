'use client'

import { useProperty } from '@/hooks/useProperties'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import ImageGallery from '@/components/ImageGallery'

// Dynamisk import af MapComponent for at undgå SSR problemer
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-100 animate-pulse rounded-lg" />
})

export default function PropertyListing() {
  const { id } = useParams()
  const { property, isLoading, error } = useProperty(id)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeView, setActiveView] = useState('exterior') // 'exterior', 'floorplan', eller 'map'
  
  const exteriorImages = property?.images?.map(img => ({
    url: img.url,
    alt: 'Boligbillede'
  })) || []
  
  const floorplanImages = property?.floorplan ? [{
    url: property.floorplan.url,
    alt: 'Plantegning'
  }] : []
  
  if (isLoading) return <Loader2 className="w-5 h-5 animate-spin" />
  if (error) return <div className="container mx-auto px-4 py-8">Fejl: {error}</div>
  if (!property) return <div className="container mx-auto px-4 py-8">Boligen blev ikke fundet.</div>

  const activeImages = activeView === 'exterior' ? exteriorImages : floorplanImages
  const currentImage = activeImages[activeImageIndex]

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Hero Section - Viser enten billede, plantegning eller kort */}
      <div className="relative w-full h-[500px] mb-6 rounded-lg overflow-hidden">
        {activeView === 'map' ? (
          <MapComponent 
            position={[property.lat, property.long]}
          />
        ) : (
          <ImageGallery property={property} />
        )}
      </div>

      {/* Property Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          
          <h1 className="text-2xl font-semibold">{property.adress1}</h1>
          <p className="text-lg">{property.city}</p>
        </div>
              {/* Image Controls */}
      <div className="flex gap-4 justify-end mb-8">
        <button 
          onClick={() => {
            setActiveView('exterior')
            setActiveImageIndex(0)
          }}
          aria-label="Vis billeder"
        >
          <Image src="/svg/images.svg" alt="" width={24} height={24} />
          <span>Billeder ({exteriorImages.length})</span>
        </button>
        <button 
          onClick={() => {
            setActiveView('floorplan')
            setActiveImageIndex(0)
          }}
          aria-label="Vis plantegninger"
        >
          <Image src="/svg/plan.svg" alt="" width={24} height={24} />
          <span>Plantegning {floorplanImages.length ? '(1)' : '(0)'}</span>
        </button>
        <button 
          onClick={() => setActiveView('map')}

          aria-label="Vis på kort"
        >
          <Image src="/svg/location.svg" alt="" width={24} height={24} />
        </button>
        <button aria-label="Tilføj til favoritter">
          <Image src="/svg/heart.svg" alt="" width={24} height={24} />
        </button>
      </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">Kr. {property.price?.toLocaleString()}</p>
        </div>

      </div>



      {/* Property Details */}
      <div className="grid grid-cols-3 gap-x-16 gap-y-4 mb-12">
        <DetailItem label="Sagsnummer" value={property.id} />
        <DetailItem label="Kælder" value={property.basement ? `${property.basement} m²` : '-'} />
        <DetailItem label="Udbetaling" value={`Kr. ${Math.round(property.price * 0.05).toLocaleString()}`} />
        <DetailItem label="Boligareal" value={`${property.livingspace} m²`} />
        <DetailItem label="Byggeår" value={property.built || '-'} />
        <DetailItem label="Brutto ex. ejerudgift" value={`Kr. ${property.payment?.toLocaleString()}`} />
        <DetailItem label="Grundareal" value={`${property.lotsize} m²`} />
        <DetailItem label="Ombygget" value={property.remodel || '-'} />
        <DetailItem label="Netto ex. ejerudgift" value={`Kr. ${property.net?.toLocaleString()}`} />
        <DetailItem label="Rum/værelser" value={property.rooms} />
        <DetailItem label="Energimærke" value={property.energylabel} />
        <DetailItem label="Ejerudgifter" value={`Kr. ${property.cost?.toLocaleString()}`} />
        <DetailItem label="Antal plan" value={property.floors} />
      </div>

      {/* Description Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Beskrivelse</h2>
        <div className="prose max-w-none">
          {property.description}
        </div>
      </section>

      {/* Agent Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ansvarlig mægler</h2>
        <div className="flex gap-6">
          <div className="relative w-48 h-48">
            <Image
              src={property.agent?.image.url || '/placeholder-agent.jpg'}
              alt={property.agent?.name || 'Ejendomsmægler'}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{property.agent?.name}</h3>
            <p className="text-gray-600 mb-4">{property.agent?.title}</p>
            <p className="mb-2">
              <a href={`tel:${property.agent?.phone}`} className="text-blue-600">
                {property.agent?.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${property.agent?.email}`} className="text-blue-600">
                {property.agent?.email}
              </a>
            </p>
            <div className="flex gap-4 mt-4">
              <SocialLink href={property.agent?.instagram} icon="instagram" />
              <SocialLink href={property.agent?.linkedin} icon="linkedin" />
              <SocialLink href={property.agent?.skype} icon="skype" />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span>{value}</span>
    </div>
  )
}

function SocialLink({ href, icon }) {
  if (!href) return null
  return (
    <a href={href} aria-label={`Besøg ${icon}`}>
      <Image src={`/icons/${icon}.svg`} alt="" width={24} height={24} />
    </a>
  )
}

