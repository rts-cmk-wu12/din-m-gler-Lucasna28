"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useHeroImage } from "@/hooks/useHeroImage"
import { useSearch } from "@/hooks/useSearch"
import { Search, Loader2, Home, User, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const { backgroundImage, isLoading: isImageLoading } = useHeroImage()
  const { 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    isLoading: isSearching,
    showDropdown,
    setShowDropdown,
    handleSearch,
    selectedFilter,
    setSelectedFilter,
  } = useSearch()

  // Limit search til 3
  const limitedResults = searchResults.slice(0, 3)

  {/* framer motion animationer */}
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <section 
      className="relative bg-cover bg-center h-[92dvh]" 
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: !backgroundImage ? '#162A41' : 'transparent'
      }}
      role="banner"
      rel="preload"
      aria-label="Property Search Hero Section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" aria-hidden="true" />
      
      <motion.div 
        className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find din drømmebolig
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Udforsk vores udvalg af eksklusive boliger og find dit næste hjem
          </p>
        </motion.div>
        <motion.div 
          className="w-full max-w-3xl bg-white rounded-lg shadow-xl"
          variants={itemVariants}
        >
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="container">

              <h2 className="text-gray-900 font-semibold text-xl">
                Søg blandt {158} boliger i {74} butikker
              <hr className="w-12 h-1 bg-primary-color01 "/>
              </h2>
              <p className="text-gray-500 mt-4">Hvad skal din næste bolig indeholde</p>
              </div>
              <nav >
                <ul className="flex space-x-2">
                  {[
                    { id: "all", label: "Alle" },
                    { id: "properties", label: "Boliger" },
                    { id: "agents", label: "Mæglere" }
                  ].map(({ id, label }) => (
                    <li key={id}>
                      <button
                        onClick={() => setSelectedFilter(id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedFilter === id
                            ? "bg-primary-color01 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <form 
              onSubmit={handleSearch} 
              className="relative"
              role="search"
              aria-label="Søg efter bolig eller mægler"
            >
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-gray-400" aria-hidden="true" />
                <input
                  id="search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Søg på adresse, by, mægler eller beskrivelse..."
                  className="w-full pl-12 pr-24 py-4 rounded-lg border border-gray-200 focus:ring-primary-color01 focus:border-transparent text-gray-900 text-lg"
                />
                <button 
                  type="submit"
                  className="absolute right-4 bg-primary-color01 text-white px-6 py-2 rounded-lg hover:bg-primary-color01/90 transition-colors disabled:opacity-50"
                  disabled={isSearching}
                >
                  {isSearching ? <Loader2 className="animate-spin" /> : "Søg"}
                </button>
              </div>
              <AnimatePresence>
                {showDropdown && limitedResults.length > 0 && (
                  <motion.div
                    id="search-results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                    role="listbox"
                  >
                    {limitedResults.map((result) => (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={result.type === 'property' ? `/boliger/${result.id}` : `/maeglere/${result.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-t first:border-t-0"
                        onClick={() => setShowDropdown(false)}
                        role="option"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={result.image}
                            alt=""
                            fill
                            className="object-cover"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {result.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {result.subtitle}
                          </div>
                          {result.details && (
                            <div className="text-xs text-gray-400 mt-1 truncate">
                              {result.type === 'property' ? (
                                <span>
                                  {result.details.size}m² • {result.details.rooms} værelser • 
                                  {result.details.price?.toLocaleString()} kr.
                                </span>
                              ) : (
                                <span>
                                  {result.details.specialization} • {result.details.area}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        {result.type === 'property' ? (
                          <Home className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                        ) : (
                          <User className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}