"use client"
import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Mail, Phone, User, Heart, Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { isLoggedIn, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="w-full">
      {/* Top bar */}
      <div role="banner" className="bg-primary-color01 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
            <nav aria-label="Kontakt information">
              <ul className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 space-y-2 md:space-y-0">
                <li>
                  <Link 
                    href="mailto:contact@dinmaegler.dk" 
                    className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>contact@dinmaegler.dk</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="tel:+4570704000" 
                    className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>+45 7070 4000</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              {isLoggedIn ? (
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>Log ud</span>
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>Log ind</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav aria-label="Hovedmenu" className="bg-white shadow-md relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-[#162A41]">
              <h1>DIN MÆGLER</h1>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2"
              aria-label={isMenuOpen ? 'Luk menu' : 'Åbn menu'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop menu */}
            <motion.ul 
              className="hidden md:flex space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <li>
                <Link href="/boliger" className="text-gray-600 hover:text-[#162A41] transition-colors">
                  Boliger til salg
                </Link>
              </li>
              <li>
                <Link href="/maeglere" className="text-gray-600 hover:text-[#162A41] transition-colors">
                  Mæglere
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-[#162A41] transition-colors">
                  Kontakt
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link href="/favoritter" className="text-gray-600 hover:text-[#162A41] transition-colors flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>Mine favoritter</span>
                  </Link>
                </li>
              )}
            </motion.ul>
          </div>

          {/* Mobile menu */}
          <motion.div
            className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute left-0 right-0 bg-white shadow-lg z-50`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-4 px-4 space-y-4">
              <li>
                <Link 
                  href="/boliger" 
                  className="block text-gray-600 hover:text-[#162A41] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Boliger til salg
                </Link>
              </li>
              <li>
                <Link 
                  href="/maeglere" 
                  className="block text-gray-600 hover:text-[#162A41] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mæglere
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className="block text-gray-600 hover:text-[#162A41] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link 
                    href="/favoritter" 
                    className="block text-gray-600 hover:text-[#162A41] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      Mine favoritter
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </nav>
    </header>
  )
}
