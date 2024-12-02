'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import TeamCardSkeleton from '@/components/skeletons/TeamCardSkeleton'
import PageHero from '@/components/ui/PageHero'

export default function AgentsPage() {
  const [agents, setAgents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch('https://dinmaegler.onrender.com/agents')
        const data = await res.json()
        setAgents(data)
      } catch (err) {
        setError('Kunne ikke hente mæglere')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgents()
  }, [])

  if (isLoading) return (
    <>
      <PageHero 
        title="Medarbejdere i Roskilde"
        backgroundImage="/images/boliger-hero.png"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <TeamCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <>
      <section className="relative bg-cover w-full h-[10rem]" 
        style={{ 
          backgroundImage: `url('/images/boliger-hero.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/65 w-full" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Medarbejdere i Roskilde
          </motion.h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  href={`/maeglere/${agent.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-[300px]">
                    <Image
                      src={agent.image.url}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
                    <p className="text-gray-600 mb-4">Ejendomsmægler, MDMS</p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{agent.email}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
} 