"use client"
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function FavoritterPage() {
  const [favorites, setFavorites] = useState([])
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      // Hent favoritter fra API'et
      fetchFavorites()
    }
  }, [isLoggedIn])

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('https://din-api-url/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setFavorites(data)
    } catch (error) {
      console.error('Fejl ved hentning af favoritter:', error)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Du skal være logget ind for at se dine favoritter.</p>
        <Link href="/login" className="text-primary-color01 hover:underline">
          Log ind her
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mine favoritter</h1>
      
      {favorites.length === 0 ? (
        <div>
          <p>Du har ingen favoritter endnu.</p>
          <Link href="/boliger" className="text-primary-color01 hover:underline">
            Se alle boliger
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Vis favorit boliger her */}
        </div>
      )}
    </div>
  )
} 