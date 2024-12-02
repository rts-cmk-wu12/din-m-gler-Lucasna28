"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useHeroImage } from "@/hooks/useHeroImage"
import { useSearch } from "@/hooks/useSearch"
import { Search, Loader2, Home, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Toast } from "@/components/ui/Toast"

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
    toast,
    setToast
  } = useSearch()

  return (
    <>
      <section 
        className="relative bg-cover bg-center h-[60rem]" 
        style={{ 
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor: !backgroundImage ? '#162A41' : 'transparent'
        }}
      >
        <div className="absolute inset-0 bg-black/65 w-full" />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Søg efter din drømmebolig
          </motion.h1>

          <motion.form 
            className="w-full max-w-2xl search-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSearch}
          >
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Søg på adresse, beskrivelse eller mægler..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-color01 focus:border-transparent text-gray-900"
                />
                {isSearching && (
                  <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                )}
              </div>

              <AnimatePresence>
                {showDropdown && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {searchResults.map((result) => (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={result.type === 'property' ? `/bolig/${result.id}` : `/maeglere/${result.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={result.image}
                            alt={result.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium text-gray-900">{result.title}</div>
                          <div className="text-sm text-gray-500">{result.subtitle}</div>
                        </div>
                        {result.type === 'property' ? (
                          <Home className="w-5 h-5 text-gray-400" />
                        ) : (
                          <User className="w-5 h-5 text-gray-400" />
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </section>

      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              isVisible={true}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

