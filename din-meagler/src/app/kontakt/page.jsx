'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [newsletter, setNewsletter] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Navn er påkrævet'
    if (!formData.email.trim()) newErrors.email = 'Email er påkrævet'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Indtast en gyldig email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Emne er påkrævet'
    if (!formData.message.trim()) newErrors.message = 'Besked er påkrævet'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (newsletter) {
        const response = await fetch('https://dinmaegler.onrender.com/subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        })
        
        if (!response.ok) {
          throw new Error('Nyhedsbrev tilmelding fejlede')
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setFormData({ name: '', email: '', subject: '', message: '' })
      setNewsletter(false)
      
    } catch (error) {
      console.error('Der opstod en fejl:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
            Kontakt os
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Vi sidder klar til at besvare dine spørgsmål</h2>
            <p className="text-gray-600">
              Der kan opstå tvivl om mange ting når man gerne vil, eller er i gang med at sælge sin bolig.
              <br />Vores medarbejdere sidder klar alle ugens dage til at svare på dine spørgsmål.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Navn</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emne</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`w-full p-2 border rounded ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Besked</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full p-2 border rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="rounded text-primary-color01"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-700">
                    Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#162A41] text-white px-6 py-2 rounded hover:bg-[#162A41]/90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sender...' : 'Send besked'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary-color01" />
                <div>
                  <h3 className="font-semibold">Ring til os</h3>
                  <p>+45 7070 4000</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary-color01" />
                <div>
                  <h3 className="font-semibold">Send en mail</h3>
                  <p>4000@dinmaegler.dk</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-primary-color01" />
                <div>
                  <h3 className="font-semibold">Besøg butikken</h3>
                  <p>Stændertorvet 78,</p>
                  <p>4000 Roskilde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 