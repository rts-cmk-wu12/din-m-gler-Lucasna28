import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchPropertyById } from '@/utils/fetch/propertyService'
import FavoritsCardSkeleton from '../skeletons/FavoritsCardSkeleton'

export default function FavoritsCard({ propertyId, onRemove }) {
  const [property, setProperty] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const getEnergyLabelColor = (label) => {
    const colors = {
      A: "bg-energyLabel-A text-white",
      B: "bg-energyLabel-B text-white",
      C: "bg-energyLabel-C text-white",
      D: "bg-energyLabel-D text-white",
    };
    return colors[label] || "bg-gray-200 text-gray-800";
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await fetchPropertyById(propertyId)
        setProperty(data)
      } catch (err) {
        setError("Der opstod en fejl ved hentning af boligdata.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  if (isLoading) {
    return <FavoritsCardSkeleton/>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <section className="flex items-center justify-between border-shape-shape01 border-2 p-8 w-full" >
      <div className="flex gap-4 lg:w-[60rem] md:w-[30rem] sm:w-fit">
        <div className="flex flex-col w-full">
          <Link href={`/boliger/${property.id}`} className="flex gap-4 w-full">
            {property.images && property.images.length > 0 ? (
              <Image
                src={property.images[0].url}
                alt={property.adress1 || 'Boligbillede'}
                width={240}
                height={150}
                className=" rounded"
              />
            ) : (
              <div className="bg-gray-200 rounded" />
            )}
            <div className="flex justify-between w-full">
              <div className='flex flex-col justify-evenly'>
                <h3 className="font-semibold text-lg">{property.adress1}</h3>
                <p className="text-gray-600">{property.postalcode} {property.city}</p>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">{property.type}</p>
                  <p className="mx-2">·</p>
                  <p className="text-sm text-gray-500 text-nowrap">Ejerudgift: {property.cost.toLocaleString()} kr.</p>
                </div>
              </div>
              <div className="flex w-full">
                <div className='flex gap-4 w-full justify-center'>
                  <p
                    className={`px-2 py-1 rounded text-sm font-medium h-7 text-center ${getEnergyLabelColor(
                      property.energylabel
                    )}`}
                  >
                    {property.energylabel}
                  </p>
                  <p>{property.rooms} værrelser</p>
                  <p>{property.gross} m²</p>
                </div>
                <div className='flex flex-col justify-between'>
                  <p className="font-semibold text-lg self-end">Kr. {property.price.toLocaleString()} </p>
                </div>
              </div>
            </div>
          </Link>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Stop linket fra at blive klikket
              onRemove(propertyId); // Kald onRemove med propertyId
            }}
            className='mt-2 p-4 text-nowrap bg-primary-color01 text-white rounded hover:bg-primary-color04 transition duration-200 self-end'
          >
            Fjern fra favoritter
          </button>
        </div>
      </div>
    </section>
  )
}
