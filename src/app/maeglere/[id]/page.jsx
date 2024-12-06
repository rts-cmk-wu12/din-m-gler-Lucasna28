'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Instagram, Linkedin, Phone, Mail, MapPin, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'

export default function AgentDetailsPage() {
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch(`https://dinmaegler.onrender.com/agents/${id}`)
        if (!res.ok) throw new Error('Kunne ikke hente mæglerdata')
        const data = await res.json()
        setAgent(data)
      } catch (err) {
        setError('Kunne ikke hente mæglerdata')
      } finally {
        setIsLoading(false)
      }
    }
    fetchAgent()
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implementer kontaktformular logik her
    console.log('Form submitted:', formData)
  }
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color01"></div>
    </div>
  )

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <>
      <PageHero 
        title="Kontakt en medarbejder"
        backgroundImage="/images/boliger-hero.png"
      />


      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col border-2 border-gray-200">
          {/* Venstre kolonne med mæglerinfo */}
          <div className="lg:col-span-2" >
            <div className="bg-white p-8 rounded-lg">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-64 h-64">
                  <Image
                    src={agent.image.url}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{agent.name}</h2>
                  <p className="text-gray-600 mb-4">Statsautoriseret ejendomsmægler</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{agent.email}</span>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <a href={agent.instagram} className="text-gray-400 hover:text-gray-600">
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a href={agent.linkedin} className="text-gray-400 hover:text-gray-600">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Om {agent.name}</h3>
                <p className="text-gray-600">
                  Der er mange tilgængelige udgaver af Lorem Ipsum, men de fleste udgaver har gennemgået forandringer, når nogen har tilføjet humor eller tilfældige ord, som på ingen måde ser ægte ud.
                </p>
              </div>
            </div>
          </div>

          {/* Højre kolonne med kontaktformular */}
          <div>
            <div className="bg-white p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4 border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-6">Kontakt {agent.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Navn</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Indtast navn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Indtast email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Emne</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Hvad drejer din henvendelse sig om?"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Besked</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border rounded"
                    placeholder="Skriv din besked her..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-1/4 bg-primary-color01 text-white py-2 px-4 rounded hover:bg-primary-color01/90"
                >
                  Send besked
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>

          <div className='border p-4 border-gray-200 bg-shape-shape02 w-1/2 flex flex-col gap-2'>
            <p>search Property</p>
            <hr />
            <input type="text" placeholder="search" 
              className='w-full p-2 border rounded'
            />
          </div>
          <div className='bg-primary-color01 text-white p-4 w-1/2 flex flex-col items-center justify-center h-1/4'>
            <p className='text-center'>Find The Best Property
            For Rent Or Buy</p>
            <div className='h-1 w-1/4 bg-white'></div>
            <p className='text-center'>Call Us Now</p>
            <p className='text-center'>+00 123 456 789</p>
          </div>
        </div>

      </section>
    </>
  )
} 