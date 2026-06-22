import { useState, useEffect, useCallback } from 'react'
import { authService, AuthUser } from '@/services'
import { AppError, ErrorCode } from '@/types'
import { ErrorHandler } from '@/utils/error.handler'

export interface UseAuthReturn {
  user: AuthUser | null
  loading: boolean
  error: AppError | null
  register: (email: string, password: string, displayName: string) => Promise<AuthUser>
  login: (email: string, password: string) => Promise<AuthUser>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateDisplayName: (displayName: string) => Promise<void>
  updatePhotoURL: (photoURL: string) => Promise<void>
  clearError: () => void
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AppError | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const handleError = useCallback(
    (err: unknown) => {
      const appError = err instanceof AppError ? err : ErrorHandler.createError(ErrorCode.UNKNOWN, String(err), err)
      setError(appError)
      ErrorHandler.logError(err, 'useAuth')
    },
    [],
  )

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      setLoading(true)
      clearError()
      try {
        const newUser = await authService.register(email, password, displayName)
        setUser(newUser)
        return newUser
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [clearError, handleError],
  )

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      clearError()
      try {
        const loggedInUser = await authService.login(email, password)
        setUser(loggedInUser)
        return loggedInUser
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [clearError, handleError],
  )

  const logout = useCallback(async () => {
    setLoading(true)
    clearError()
    try {
      await authService.logout()
      setUser(null)
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [clearError, handleError])

  const resetPassword = useCallback(
    async (email: string) => {
      setLoading(true)
      clearError()
      try {
        await authService.resetPassword(email)
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [clearError, handleError],
  )

  const updateDisplayName = useCallback(
    async (displayName: string) => {
      setLoading(true)
      clearError()
      try {
        await authService.updateDisplayName(displayName)
        if (user) {
          setUser({ ...user, displayName })
        }
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [user, clearError, handleError],
  )

  const updatePhotoURL = useCallback(
    async (photoURL: string) => {
      setLoading(true)
      clearError()
      try {
        await authService.updatePhotoURL(photoURL)
        if (user) {
          setUser({ ...user, photoURL })
        }
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [user, clearError, handleError],
  )

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
    updateDisplayName,
    updatePhotoURL,
    clearError,
  }
}
