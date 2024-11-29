'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toast } from '@/components/ui/Toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AfmeldNyhedsbrevPage() {
  const [email, setEmail] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const checkResponse = await fetch(`https://dinmaegler.onrender.com/subscribers/${email}`, {
        method: 'GET',
      })

      if (checkResponse.status === 404) {
        setToastMessage({
          type: 'info',
          message: 'Denne email er ikke tilmeldt vores nyhedsbrev'
        })
        setShowToast(true)
        setEmail('')
        return
      }

      const response = await fetch(`https://dinmaegler.onrender.com/subscribers/${email}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setIsSuccess(true)
        setToastMessage({
          type: 'success',
          message: 'Du er nu afmeldt vores nyhedsbrev'
        })
      } else {
        throw new Error('Der skete en fejl')
      }
    } catch (error) {
      setToastMessage({
        type: 'error',
        message: 'Der opstod en fejl. Prøv venligst igen senere.'
      })
    } finally {
      setIsSubmitting(false)
      setShowToast(true)
      setEmail('')
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
        <div className="absolute inset-0 bg-black/65 w-full" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Link 
            href="/"
            className="flex items-center text-white mb-4 hover:text-gray-200 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tilbage til forsiden
          </Link>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Afmeld nyhedsbrev
          </motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          {isSuccess ? (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-semibold mb-4">Tak for din afmelding</h2>
              <p className="text-gray-600 mb-6">
                Du er nu afmeldt vores nyhedsbrev og vil ikke modtage flere mails fra os.
              </p>
              <Link 
                href="/"
                className="inline-block bg-primary-color01 text-white px-6 py-2 rounded-md hover:bg-primary-color01/90 transition-colors"
              >
                Tilbage til forsiden
              </Link>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Indtast din email-adresse nedenfor for at afmelde dig vores nyhedsbrev. 
                Du kan altid tilmelde dig igen senere.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email adresse
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-color01 focus:border-primary-color01"
                    placeholder="Indtast din email"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary-color01 text-white py-3 rounded-md font-medium 
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-color01/90'} 
                    transition-colors relative`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Afmeld nyhedsbrev</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    </>
                  ) : (
                    'Afmeld nyhedsbrev'
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
} 