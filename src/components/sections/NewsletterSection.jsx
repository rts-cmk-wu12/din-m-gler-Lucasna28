"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader2 } from 'lucide-react'
import { Toast } from '../ui/Toast'
import { useToast } from '@/hooks/useToast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { addToast, ToastContainer } = useToast()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email er påkrævet'
    if (!regex.test(email)) return 'Indtast venligst en gyldig email'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched(true)
    
    const error = validateEmail(email)
    if (error) {
      addToast(error, 'error')
      return
    }
  
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
      addToast('Tak for din tilmelding! Du vil modtage en bekræftelse på mail.', 'success')
      setEmail('')
      setTouched(false)
    } catch (error) {
      addToast('Der opstod en fejl. Prøv venligst igen.', 'error')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <section className="py-16 bg-cover bg-center h-[14rem] w-full relative"
     style={{ 
        backgroundImage: "url('/images/newsletter.png')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
     }}>
        <div className="absolute inset-0 bg-black/65 w-full" />
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full mx-auto text-center text-white flex items-center justify-center">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4 w-1/3">
          Tilmeld dig vores nyhedsbrev og 
          hold dig opdateret på boligmarkedet
          </motion.h2>          
          <motion.form 
            variants={itemVariants}
            onSubmit={handleSubmit} 
            className="flex gap-4 max-w-xl mx-auto"
            noValidate 
            aria-label="Nyhedsbrev tilmelding"
          >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Din e-mail adresse"
                className={`
                  flex-1 px-4 py-3 rounded-md text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-white
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  ${touched && validateEmail(email) ? 'border-red-500' : ''}
                `}
                aria-label="Email adresse"
                disabled={isLoading || isSuccess}
              />
              {touched && validateEmail(email) && (
                <p className="absolute -bottom-6 left-0 text-red-400 text-sm">
                  {validateEmail(email)}
                </p>
              )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`
                px-6 py-3 rounded-md font-semibold transition-colors
                ${isSuccess 
                  ? 'bg-green-500 text-white cursor-not-allowed' 
                  : 'bg-white text-primary-color01 hover:bg-gray-100'
                }
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isSuccess ? (
                'Tilmeldt!'
              ) : (
                'Tilmeld'
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
      <ToastContainer />
    </section>
  )
} 