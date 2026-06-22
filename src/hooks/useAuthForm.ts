import { useState } from 'react'
import { loginUser, registerUser, logoutUser } from '@/services/auth'

interface UseAuthFormReturn {
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

/**
 * Hook for handling authentication forms
 */
export function useAuthForm(): UseAuthFormReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await loginUser(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, displayName: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await registerUser(email, password, displayName)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await logoutUser()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  }
}
