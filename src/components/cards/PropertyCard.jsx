'use client'

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "@/actions/favorites";
import { getEnergyLabelColor } from "@/utils/getEnergyLabelColor";

export default function PropertyCard({ property, index, initialFavorites = [] }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Set initial favorite state based on initialFavorites prop
    setIsFavorite(initialFavorites.includes(property.id));
  }, [initialFavorites, property.id]);

  const handleToggleFavorite = async () => {
    // Check if user is logged in via cookies
    const isUserLoggedIn = document.cookie.includes("dm_token") && 
                          document.cookie.includes("dm_userid");

    if (!isUserLoggedIn) {
      router.push("/login");
      return;
    }

    try {
      const result = await toggleFavorite(property.id);
      
      if (result.success) {
        setIsFavorite(result.isFavorite);
      } else {
        console.error('Failed to toggle favorite:', result.error);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative"
    >
      {/* Hjertet */}
      
      <button
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 p-3 rounded-full z-10 bg-gray-200 bg-opacity-70 transition-colors duration-300"
        aria-label="Toggle favorite"
      >
        <Heart
          className={`w-6 h-6 ${
            isFavorite ? "fill-red-500 text-red-500" : "fill-none text-gray-800"
          }`}
        />
      </button>
      <Link href={`/boliger/${property.id}`}>
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
            <span className="text-gray-600"> {property.city}</span>
          </div>

          {/* Postnummer og by */}
          <p className="text-gray-600 mb-4">
            {property.postalcode} {property.city}
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
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${getEnergyLabelColor(
                  property.energylabel
                )}`}
              >
                {property.energylabel}
              </span>
              <span>{property.rooms} vær</span>
              <span>{property.gross} m²</span>
            </div>
            <div className="font-bold text-primary-color01">
              Kr. {property.price.toLocaleString()}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}