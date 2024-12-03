'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {motion} from "framer-motion"

// Dynamically import motion
const Motion = dynamic(
  () => import('framer-motion').then((mod) => ({ 
    motion: mod.motion 
  })),
  { ssr: false }
);

export default function PageHero({ 
  title, 
  showBackButton = false,
  backgroundImage = '/images/boliger-hero.png',
  height = 'h-[10rem]'
}) {
  const [pageTitle, setPageTitle] = useState(title || 'Din Mægler')
  const pathname = usePathname()

  useEffect(() => {
    const path = pathname.split('?')[0].split('/')
    const lastSegment = path[path.length - 1]
    
    const titleMap = {
      'kontakt': 'Kontakt os',
      'maeglere': 'Mæglere',
      'boliger': 'Boliger til salg',
      'login': 'Log ind',
      'register': 'Opret bruger',
      'afmeld-nyhedsbrev': 'Afmeld nyhedsbrev'
    }

    setPageTitle(titleMap[lastSegment] || title || 'Din Mægler')
  }, [title, pathname])

  return (
    <section 
      className={`relative bg-cover w-full ${height}`}
      style={{ 
        backgroundImage: `url('${backgroundImage}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/65 w-full" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        {showBackButton && (
          <Link 
            href="/"
            className="flex items-center text-white mb-4 hover:text-gray-200 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tilbage til forsiden
          </Link>
        )}
        {Motion ? (
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {pageTitle}
          </motion.h1>
        ) : (
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {pageTitle}
          </h1>
        )}
      </div>
    </section>
  )
}