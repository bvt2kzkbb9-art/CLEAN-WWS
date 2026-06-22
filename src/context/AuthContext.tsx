import React, { createContext, useContext, useEffect, useState } from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { onAuthStateChange, enablePersistence, getUserDocument } from '../services/auth'
import { User } from '../types'

interface AuthContextType {
  // Firebase user
  firebaseUser: FirebaseUser | null | undefined
  // User document from Firestore
  userProfile: User | null | undefined
  // Loading state
  isLoading: boolean
  // Auth error
  error: string | null
  // Check if user is authenticated
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null | undefined>(undefined)
  const [userProfile, setUserProfile] = useState<User | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Enable persistence first
    enablePersistence().catch((err) => {
      console.warn('Persistence error:', err)
    })

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange(async (user) => {
      try {
        setFirebaseUser(user)
        setError(null)

        if (user) {
          // Fetch user profile from Firestore
          const profile = await getUserDocument(user.uid)
          setUserProfile(profile)
        } else {
          setUserProfile(null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user profile')
        console.error('Auth state change error:', err)
      } finally {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const value: AuthContextType = {
    firebaseUser,
    userProfile,
    isLoading,
    error,
    isAuthenticated: !!firebaseUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
