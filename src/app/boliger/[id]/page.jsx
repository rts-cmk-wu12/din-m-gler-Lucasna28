'use client'

import { useProperty } from '@/hooks/useProperties'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import ImageGallery from '@/components/ImageGallery'
import DetailItem from '@/components/ui/DetailItem' 
import { motion } from 'framer-motion'
import TeamCardSkeleton from '@/components/skeletons/TeamCardSkeleton'
import AgentCard from '@/components/cards/AgentCard'

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
  
  if (isLoading) return <TeamCardSkeleton />
  if (error) return <div className="container mx-auto px-4 py-8">Fejl: {error}</div>
  if (!property) return <div className="container mx-auto px-4 py-8">Boligen blev ikke fundet.</div>

  const activeImages = activeView === 'exterior' ? exteriorImages : floorplanImages
  const currentImage = activeImages[activeImageIndex]

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Hero Section - Viser enten billede, plantegning eller kort */}
      <motion.div 
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        transition={{duration: 0.7 }}
        className="relative w-full h-[500px] mb-6 rounded-lg overflow-hidden">
        <ImageGallery 
          property={property} 
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </motion.div>
      {/* Property Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        transition={{duration: 0.7 }}
        className="flex justify-between items-start mb-6"
      >
        <div>
          <h1 className="text-2xl font-semibold">{property.adress1}</h1>
          <p className="text-lg text-gray-600">{property.postalcode} {property.city}</p>
        </div>
      {/* Image Controls */}
      <div className="flex gap-4 justify-end mb-8">
        <button 
          onClick={() => setActiveView('exterior')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
          ${activeView === 'exterior' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          aria-label="Vis billeder"
        >
          <Image src="/svg/images.svg" alt="" width={24} height={24} />
        </button>
        <button 
          onClick={() => setActiveView('floorplan')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
          ${activeView === 'floorplan' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          aria-label="Vis plantegninger"
        >
          <Image src="/svg/plan.svg" alt="" width={24} height={24} />
        </button>
        <button 
          onClick={() => setActiveView('map')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
          ${activeView === 'map' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          aria-label="Vis på kort"
        >
          <Image src="/svg/location.svg" alt="" width={24} height={24} />
        </button>
        <button 
          aria-label="Tilføj til favoritter"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Image src="/svg/heart.svg" alt="" width={24} height={24} />
        </button>
      </div>
      <div className="text-right">
        <h2 className="text-2xl font-semibold">Kr. {property.price?.toLocaleString()}</h2>
        <p className="text-gray-600">Udbetaling kr. {Math.round(property.price * 0.05).toLocaleString()}</p>
      </div>
      </motion.div>
      {/* Property Details */}
      <motion.ul 
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        transition={{duration: 0.4 }}
        className="grid grid-cols-3 gap-x-16 gap-y-4 mb-12"
      >
        <DetailItem label="Sagsnummer" value={property.id} />
        <DetailItem label="Kælder" value={property.basementsize ? `${property.basementsize} ` : '-'} />
        <DetailItem label="Udbetaling" value={`Kr. ${Math.round(property.price * 0.05).toLocaleString()}`} />
        <DetailItem label="Boligareal" value={`${property.livingspace} m²`} />
        <DetailItem label="Byggeår" value={property.built || '-'} />
        <DetailItem label="Brutto ex. ejerudgift" value={`Kr. ${property.payment?.toLocaleString()}`} />
        <DetailItem label="Grundareal" value={`${property.lotsize} m²`} />
        <DetailItem label="Ombygget" value={property.remodel || '-'} />
        <DetailItem label="Netto ex. ejerudgift" value={`Kr. ${property.netto?.toLocaleString()}`} />
        <DetailItem label="Rum/værelser" value={property.rooms} />
        <DetailItem label="Energimærke" value={property.energylabel} />
        <DetailItem label="Ejerudgifter" value={`Kr. ${property.cost?.toLocaleString()}`} />
        <DetailItem label="Antal plan" value={property.numberOfFloors} />
      </motion.ul>
      <motion.section 
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        transition={{duration: 0.7 }}
        className='w-full flex justify-between'>
      {/* Description Section */}
      <div className="flex flex-col w-1/2">
        <h3 className="text-xl font-semibold mb-4">Beskrivelse</h3>
        <p className="w-11/12 text-pretty whitespace-break-spaces">
          {property.description}
        </p>
      </div>
      {/* Agent Section */}
      <div className='flex flex-col w-1/2'>
        <h3 className="text-xl font-semibold mb-4">Ansvarlig mægler</h3>
        <div className="flex gap-6 border-2 border-shape-shape01 p-8 h-[80%]">
        <AgentCard agent={property.agent} /> 
          <div className='flex flex-col justify-around h-2/3'>
            <h4 className="text-xl font-semibold">{property.agent?.name}</h4>
            <p className="text-gray-600 mb-4">{property.agent?.title}</p>
            <hr className='w-1/3 h-0.5 bg-shape-shape01'/>
            <p className="flex">
              <Image src="/svg/phone.svg" alt="" width={18} height={18} className='mr-4' />
              <a href={`tel:${property.agent?.phone}`} className="text-primary-color01">
                {property.agent?.phone}
              </a>
            </p>
            <p className='flex'>
            <Image src="/svg/paperplane.svg" alt="" width={18} height={18} className='mr-4' />
              <a href={`mailto:${property.agent?.email}`} className="text-primary-color01 capitalize">
                {property.agent?.email}
              </a>
            </p>
          </div>
        </div>
      </div>
      </motion.section>
    </section>
  )
}

