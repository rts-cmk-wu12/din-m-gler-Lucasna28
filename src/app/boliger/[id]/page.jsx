'use client'

import { useProperty } from '@/hooks/useProperties'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2, Heart } from 'lucide-react'
import DetailItem from '@/components/ui/DetailItem' 
import { motion } from 'framer-motion'
import TeamCardSkeleton from '@/components/skeletons/TeamCardSkeleton'
import AgentCard from '@/components/cards/AgentCard'
import ImageGallery from '@/components/gallery/ImageGallery'
import { useRouter } from 'next/navigation'
import { toggleFavorite } from '@/actions/favorites'
import PropertySkeleton from '@/components/skeletons/PropertySkeleton'

export default function PropertyListing() {
  const { id } = useParams()
  const router = useRouter()
  const { property, isLoading, error } = useProperty(id)
  const [activeView, setActiveView] = useState('exterior')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  
  useEffect(() => {
    // Check if property is in favorites when component mounts
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch('https://dinmaegler.onrender.com/users/me', {
          headers: {
            Authorization: `Bearer ${document.cookie.match(/dm_token=([^;]+)/)?.[1]}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setIsFavorite(userData.homes?.includes(id));
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    
    if (document.cookie.includes('dm_token')) {
      checkFavoriteStatus();
    }
  }, [id]);

  const handleToggleFavorite = async () => {
    const isUserLoggedIn = document.cookie.includes("dm_token") && 
                          document.cookie.includes("dm_userid");

    if (!isUserLoggedIn) {
      router.push("/login");
      return;
    }

    if (isTogglingFavorite) return;

    setIsTogglingFavorite(true);
    const previousState = isFavorite;
    setIsFavorite(!previousState); // Optimistic update

    try {
      const result = await toggleFavorite(id);
      if (!result.success) {
        setIsFavorite(previousState);
      }
    } catch (error) {
      setIsFavorite(previousState);
      console.error('Error toggling favorite:', error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  if (isLoading) return <>
    <PropertySkeleton />
    <TeamCardSkeleton />
  </> 
  if (error) return <div className="container mx-auto px-4 py-8">Fejl: {error}</div>
  if (!property) return <div className="container mx-auto px-4 py-8">Boligen blev ikke fundet.</div>

  return (
    <section className="container mx-auto px-4 py-8">
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
            onClick={handleToggleFavorite}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
            aria-label={isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
          >
            {isTogglingFavorite ? (
              <Loader2 className="w-6 h-6 animate-spin text-gray-800" />
            ) : (
              <Heart
                className={`w-6 h-6 transition-colors duration-300 ${
                  isFavorite ? "fill-red-500 text-red-500" : "fill-none text-gray-800 group-hover:text-red-500"
                }`}
              />
            )}
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

