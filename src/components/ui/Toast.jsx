'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { CheckCircle, XCircle, X, Info } from 'lucide-react'

const toastVariants = {
  initial: { 
    opacity: 0, 
    y: 50, 
    x: '100%',
    scale: 0.3,
    rotate: -10
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.5,
    x: '100%',
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      delay: 0.4
    }
  }
}

export function Toast({ message, isVisible, onClose, type = 'success' }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-primary-color01' // #162A41
      case 'error':
        return 'bg-primary-red' // #F21515
      case 'info':
        return 'bg-background-bg03' // #25517A
      default:
        return 'bg-primary-color01'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />
      case 'error':
        return <XCircle className="h-5 w-5 flex-shrink-0" />
      case 'info':
        return <Info className="h-5 w-5 flex-shrink-0" />
      default:
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />
    }
  }

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex justify-end"
    >
      <div className={`rounded-lg px-6 py-4 shadow-lg flex items-center space-x-4 ${getBackgroundColor()} text-white max-w-[300px]`}>
        <motion.div variants={iconVariants}>
          {getIcon()}
        </motion.div>
        <span className="flex-1">{message}</span>
        <motion.button 
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

