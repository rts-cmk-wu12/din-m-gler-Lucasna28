'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const success = await login(username, password)
    if (success) {
      router.push('/')
    } else {
      setError('Login fejlede. Kontroller venligst dine oplysninger.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="w-full h-full bg-[#162A41]/90 py-12">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8"
            >
              <h1 className="text-2xl font-bold text-center mb-6">Log ind på din konto</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Brugernavn</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#162A41] focus:border-[#162A41]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Adgangskode</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#162A41] focus:border-[#162A41]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#162A41] text-white py-3 rounded-md hover:bg-[#162A41]/90 transition-colors"
                >
                  Log ind
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Har du ikke en konto?{' '}
                  <Link href="/register" className="text-[#162A41] hover:underline">
                    Opret bruger
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

