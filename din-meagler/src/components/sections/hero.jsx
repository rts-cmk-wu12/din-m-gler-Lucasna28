"use client"
import { motion } from "framer-motion"
import { useHeroImage } from "@/hooks/useHeroImage"

export default function Hero() {
  const { backgroundImage, isLoading, error } = useHeroImage()

  return (
    <section 
      className="relative bg-cover bg-center h-[600px]" 
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: !backgroundImage ? '#162A41' : 'transparent',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }} 
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        <motion.h1 
          id="hero-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6 bg-heading-head02"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Søg efter din drømmebolig
        </motion.h1>
        
        {error && <p className="text-red-500">{error}</p>}

        <motion.form 
          className="w-full max-w-2xl bg-white rounded-lg p-6 shadow-lg"
          role="form"
          aria-labelledby="search-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-gray-900 mb-2 text-center" id="search-description">
            Søg blandt 158 boliger til salg i 74 butikker
          </div>
          
          <label htmlFor="search" className="block text-gray-700 mb-2">
            Hvad skal din næste bolig indeholde
          </label>
          <div className="flex">
            <input
              type="text"
              id="search"
              placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#162A41] focus:border-transparent"
              aria-label="Søg efter boliger"
            />
            <button
              type="submit"
              className="bg-primary-color01 text-white px-6 py-3 rounded-md transition-colors font-medium ml-2"
              aria-label="Udfør søgning"
            >
              Søg
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

