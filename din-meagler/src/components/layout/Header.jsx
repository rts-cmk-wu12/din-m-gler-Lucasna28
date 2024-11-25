"use client"
import Link from 'next/link'
import { motion } from "framer-motion"
import { Mail, Phone, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-primary-color01 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link 
              href="mailto:contact@dinmaegler.dk" 
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>contact@dinmaegler.dk</span>
            </Link>
            <Link 
              href="tel:+4570704000" 
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+45 7070 4000</span>
            </Link>
          </div>
          <Link 
            href="/login" 
            className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Log ind</span>
          </Link>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#162A41]">
            <img src="/dinmeagler.svg" alt="DIN MÆGLER" width={120} height={120}/>
          </Link>
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/boliger" className="text-gray-600 hover:text-[#162A41] transition-colors">
              Boliger til salg
            </Link>
            <Link href="/maeglere" className="text-gray-600 hover:text-[#162A41] transition-colors">
              Mæglere
            </Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-[#162A41] transition-colors">
              Kontakt os
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  )
}
