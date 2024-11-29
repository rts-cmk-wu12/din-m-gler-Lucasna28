'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Toast } from '@/components/ui/Toast'
import dynamic from 'next/dynamic'

const ContactMap = dynamic(() => import('@/components/ui/ContactMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />
})

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

// Hjælpefunktion til at generere et tilfældigt ID
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [touched, setTouched] = useState({})
  const [newsletter, setNewsletter] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    const id = generateUniqueId()
    setToasts(prev => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Navn skal være mindst 2 tegn' : ''
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? 'Indtast venligst en gyldig email' 
          : ''
      case 'subject':
        return value.trim().length < 3 ? 'Emne skal være mindst 3 tegn' : ''
      case 'message':
        return value.trim().length < 10 ? 'Beskeden skal være mindst 10 tegn' : ''
      default:
        return ''
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const error = validateField(name, value)
      if (error) {
        e.target.classList.add('border-red-500')
        e.target.classList.remove('border-green-500')
      } else {
        e.target.classList.add('border-green-500')
        e.target.classList.remove('border-red-500')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errors = Object.keys(formData).map(key => ({
      field: key,
      error: validateField(key, formData[key])
    }))

    const hasErrors = errors.some(({ error }) => error !== '')

    if (hasErrors) {
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      addToast('Udfyld venligst alle felter korrekt', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (newsletter) {
        try {
          const response = await fetch('https://dinmaegler.onrender.com/subscribers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email })
          })

          if (!response.ok) {
            if (response.status === 500) {
              addToast('Du er allerede tilmeldt vores nyhedsbrev', 'info')
              setNewsletter(false)
            } else {
              throw new Error('Der opstod en fejl ved tilmelding til nyhedsbrev')
            }
          }
        } catch (newsletterError) {
          console.error('Nyhedsbrev fejl:', newsletterError)
        }
      }
      
      addToast('Tak for din henvendelse! Vi vender tilbage hurtigst muligt.', 'success')
      
      setFormData({ name: '', email: '', subject: '', message: '' })
      setNewsletter(false)
      setTouched({})
      
    } catch (error) {
      addToast('Der opstod en fejl. Prøv venligst igen senere.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section initial="initial" animate="animate" exit="exit">
      <section className="relative bg-cover w-full h-[10rem]" 
        style={{ 
          backgroundImage: `url('/images/boliger-hero.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/65 w-full" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-4xl font-bold text-white">Kontakt os</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl text-heading-head02 font-bold mb-4">
            Vi sidder klar til at besvare dine spørgsmål
          </h2>
          <hr className="border-b-4 border-primary-color01 w-14" />
          <p className="text-paragraph-para01 w-1/2 mt-6">
            Der kan opstå tvivl om mange ting når man skal i gang med at sælge sin bolig.
            Vores medarbejdere sidder klar alle ugens dage til at svare på dine spørgsmål.
          </p>
        </div>

        <div className="flex align-middle justify-center gap-12">
          <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-4 border-2 w-1/2 border-shape-shape01 p-8 rounded-lg" noValidate>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Navn</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 border rounded ${
                      touched.name 
                        ? validateField('name', formData.name) 
                          ? 'border-red-500' 
                          : 'border-green-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Indtast dit navn"
                  />
                  {touched.name && validateField('name', formData.name) && (
                    <p className="text-red-500 text-sm mt-1">{validateField('name', formData.name)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 border rounded ${
                      touched.email 
                        ? validateField('email', formData.email) 
                          ? 'border-red-500' 
                          : 'border-green-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Indtast din email"
                  />
                  {touched.email && validateField('email', formData.email) && (
                    <p className="text-red-500 text-sm mt-1">{validateField('email', formData.email)}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Emne</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border rounded ${
                    touched.subject 
                      ? validateField('subject', formData.subject) 
                        ? 'border-red-500' 
                        : 'border-green-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Indtast emne"
                />
                {touched.subject && validateField('subject', formData.subject) && (
                  <p className="text-red-500 text-sm mt-1">{validateField('subject', formData.subject)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Besked</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={`w-full p-2 border rounded ${
                    touched.message 
                      ? validateField('message', formData.message) 
                        ? 'border-red-500' 
                        : 'border-green-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Indtast din besked..."
                />
                {touched.message && validateField('message', formData.message) && (
                  <p className="text-red-500 text-sm mt-1">{validateField('message', formData.message)}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                  Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-color01 text-white px-6 py-2 rounded font-medium w-32"
              >
                {isSubmitting ? 'Sender...' : 'Send besked'}
              </button>
          </motion.form>

          <motion.div variants={fadeInUp} className="space-y-8 border-2 w-1/3 border-gray-200 p-4 rounded-lg">
            <div className="flex flex-col items-center text-center justify-between">
              <div className="bg-primary-color01 p-3 rounded-full">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Ring til os</h3>
                <p className="text-gray-600">+45 7070 4000</p>
              </div>
            </div>
            <hr className="border-t-2 border-shape-shape01" />
            <div className="flex flex-col items-center text-center justify-between">
              <div className="bg-primary-color01 p-3 rounded-full">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Send en mail</h3>
                <p className="text-gray-600">4000@dinmaegler.dk</p>
              </div>
            </div>
            <hr className="border-t-2 border-shape-shape01" />

            <div className="flex flex-col items-center text-center justify-between">
              <div className="bg-primary-color01 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Besøg butikken</h3>
                <p className="text-gray-600">
                  Stændertorvet 78,<br />
                  4000 Roskilde
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="mt-12">
          <ContactMap />
        </motion.div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={true}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </motion.section>
  )
}
