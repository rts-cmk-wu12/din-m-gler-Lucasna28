"use client"
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check om der er en gemt token i localStorage
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      // Hent brugerdata fra API'et her
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch('https://din-api-url/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login fejlede')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      setIsLoggedIn(true)
      setUser(data.user)
      return true
    } catch (error) {
      console.error('Login fejl:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 