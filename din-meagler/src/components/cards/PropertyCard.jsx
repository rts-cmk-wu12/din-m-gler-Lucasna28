import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const getEnergyLabelColor = (label) => {
  const colors = {
    'A': 'bg-energylabel-A text-white',
    'B': 'bg-energylabel-B text-white',
    'C': 'bg-energylabel-C text-white',
    'D': 'bg-energylabel-D text-gray-800',
    'E': 'bg-energylabel-E text-gray-800',
    'F': 'bg-energylabel-F text-white',
    'G': 'bg-energylabel-G text-white',
  }
  return colors[label] || 'bg-gray-200 text-gray-800'
}

export default function PropertyCard({ property, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="relative h-[300px] overflow-hidden group">
          <Image
            src={property.images[0].url}
            alt={property.adress1}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={index < 2}
          />
        </div>
        <div className="p-6">
          {/* Adresse og by */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">{property.adress1}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="text-gray-600">{property.city}</span>
          </div>
          
          {/* Postnummer og by */}
          <p className="text-gray-600 mb-4">
            {property.zipcode} {property.city}
          </p>
          
          {/* Boligtype og ejerudgift */}
          <div className="flex items-center gap-2 mb-4">
            <span>{property.type}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>Ejerudgift: {property.cost.toLocaleString()} kr.</span>
          </div>
          
          <div className="h-0.5 bg-gray-200 my-4"></div>
          
          {/* Bottom info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 rounded text-sm font-medium ${getEnergyLabelColor(property.energylabel)}`}>
                {property.energylabel}
              </span>
              <span>{property.rooms} vær</span>
              <span>{property.gross} m²</span>
            </div>
            <div className="font-bold text-primary-color01">
              Kr. {property.payment.toLocaleString()}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 