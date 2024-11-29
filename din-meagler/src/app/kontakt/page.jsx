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
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success'
  })

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
    
    // Valider alle felter
    const errors = Object.keys(formData).map(key => ({
      field: key,
      error: validateField(key, formData[key])
    }))

    const hasErrors = errors.some(({ error }) => error !== '')

    if (hasErrors) {
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      setToast({
        visible: true,
        message: 'Udfyld venligst alle felter korrekt',
        type: 'error'
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (newsletter) {
        await fetch('https://dinmaegler.onrender.com/subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        })
      }
      
      setToast({
        visible: true,
        message: 'Tak for din henvendelse! Vi vender tilbage hurtigst muligt.',
        type: 'success'
      })
      
      setFormData({ name: '', email: '', subject: '', message: '' })
      setNewsletter(false)
      setTouched({})
      
    } catch (error) {
      setToast({
        visible: true,
        message: 'Der opstod en fejl. Prøv venligst igen senere.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit">
      <section className="relative bg-[#162A41] w-full h-[200px] flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Kontakt os</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2A2C30] mb-2">
            Vi sidder klar til at besvare dine spørgsmål
          </h2>
          <p className="text-[#7C7C7C]">
            Der kan opstå tvivl om mange ting når man skal i gang med at sælge sin bolig.
            Vores medarbejdere sidder klar alle ugens dage til at svare på dine spørgsmål.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Navn
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#162A41] transition-colors"
                    placeholder="Indtast dit navn"
                  />
                  {touched.name && validateField('name', formData.name) && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {validateField('name', formData.name)}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#162A41] transition-colors"
                    placeholder="Indtast din email"
                  />
                  {touched.email && validateField('email', formData.email) && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {validateField('email', formData.email)}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emne
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#162A41] transition-colors"
                    placeholder="Indtast emne"
                  />
                  {touched.subject && validateField('subject', formData.subject) && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {validateField('subject', formData.subject)}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Besked
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#162A41] transition-colors"
                    placeholder="Skriv din besked her"
                  />
                  {touched.message && validateField('message', formData.message) && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {validateField('message', formData.message)}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="h-4 w-4 text-[#162A41] focus:ring-[#162A41] border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                  Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev.
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#162A41] text-white py-3 rounded-md font-medium 
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#2A4B6F]'} 
                  transition-colors relative overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-[#2A4B6F]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5 }}
                  />
                )}
                <span className="relative z-10">
                  {isSubmitting ? 'Sender...' : 'Send besked'}
                </span>
              </motion.button>
            </form>
          </motion.div>


        </div>

        <motion.div 
          variants={fadeInUp}
          className="mt-12 h-[40rem] rounded-lg overflow-hidden"
        >
          <ContactMap />
        </motion.div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </motion.div>
  )
}
