'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
import PageHero from '@/components/ui/PageHero'
import { useToast } from '@/hooks/useToast'
import ContactMap from '@/components/map/ContactMap'


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

const validateField = (name, value) => {
  const validations = {
    name: value.trim().length < 2 ? 'Navn skal være mindst 2 tegn' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Indtast venligst en gyldig email' : '',
    subject: value.trim().length < 3 ? 'Emne skal være mindst 3 tegn' : '',
    message: value.trim().length < 10 ? 'Beskeden skal være mindst 10 tegn' : ''
  }
  return validations[name] || '';
}


export default function KontaktPage() {
  const { addToast, ToastContainer } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [touched, setTouched] = useState({})
  const [newsletter, setNewsletter] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const error = validateField(name, value)
      e.target.classList.toggle('border-red-500', !!error)
      e.target.classList.toggle('border-green-500', !error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = Object.keys(formData).map((key) => ({
      field: key,
      error: validateField(key, formData[key]),
    }))

    const hasErrors = errors.some(({ error }) => error !== "")
    if (hasErrors) {
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      addToast("Udfyld venligst alle felter korrekt", "error")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simuler API-kald

      if (newsletter) {
        const response = await fetch("https://dinmaegler.onrender.com/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        })

        if (!response.ok) {
          const errorMessage = response.status === 500
             "Der opstod en fejl ved tilmelding til nyhedsbrev, prøv igen senere"
          addToast(errorMessage, response.status === 500 ? "info" : "error")
          setNewsletter(false)
          return
        }
      }

      addToast("Tak for din henvendelse! Vi vender tilbage hurtigst muligt.", "success")
      if (newsletter) addToast("Du er nu tilmeldt nyhedsbrevet. Tak!", "success")

      setFormData({ name: "", email: "", subject: "", message: "" })
      setNewsletter(false)
      setTouched({})
    } catch (error) {
      addToast("Der opstod en fejl. Prøv venligst igen senere.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section initial="initial" animate="animate" exit="exit">  
      <PageHero
        title="Kontakt os"
      />      
      <div className="mx-auto  py-12">
        <div className="mb-12 p-10 flex flex-col align-middle">
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
        <motion.div variants={fadeInUp} className="mt-12 w-full h-[20rem]">
          <ContactMap />
        </motion.div>
      </div>
      <ToastContainer />
    </motion.section>
  )
}
