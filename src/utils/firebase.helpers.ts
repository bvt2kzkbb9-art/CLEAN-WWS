import { AppError, ErrorCode } from '@/types'
import { FirebaseError } from 'firebase/app'

export const handleFirebaseError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof FirebaseError) {
    return mapFirebaseError(error)
  }

  if (error instanceof Error) {
    return new AppError(ErrorCode.UNKNOWN, error.message, error)
  }

  return new AppError(ErrorCode.UNKNOWN, 'An unknown error occurred', error)
}

const mapFirebaseError = (error: FirebaseError): AppError => {
  const code = error.code

  if (code === 'permission-denied') {
    return new AppError(ErrorCode.PERMISSION_DENIED, 'You do not have permission to perform this action', error)
  }

  if (code === 'not-found') {
    return new AppError(ErrorCode.NOT_FOUND, 'The requested resource was not found', error)
  }

  if (code === 'already-exists') {
    return new AppError(ErrorCode.ALREADY_EXISTS, 'The resource already exists', error)
  }

  if (code === 'invalid-argument') {
    return new AppError(ErrorCode.INVALID_ARGUMENT, 'Invalid argument provided', error)
  }

  if (code === 'unauthenticated') {
    return new AppError(ErrorCode.UNAUTHENTICATED, 'You must be signed in to perform this action', error)
  }

  if (code === 'resource-exhausted') {
    return new AppError(ErrorCode.QUOTA_EXCEEDED, 'Resource quota exceeded', error)
  }

  if (code === 'deadline-exceeded') {
    return new AppError(ErrorCode.TIMEOUT, 'The request timed out', error)
  }

  if (code === 'unavailable' || code === 'service-unavailable') {
    return new AppError(ErrorCode.NETWORK_ERROR, 'Service is temporarily unavailable', error)
  }

  return new AppError(ErrorCode.UNKNOWN, error.message || 'An unknown Firebase error occurred', error)
}

export const isOffline = (): boolean => {
  return !navigator.onLine
}

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const exponentialBackoff = async (
  fn: () => Promise<unknown>,
  maxRetries: number = 3,
): Promise<unknown> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      const appError = error instanceof AppError ? error : handleFirebaseError(error)

      if (!appError.isRetryable() || i === maxRetries - 1) {
        throw appError
      }

      const delay = Math.pow(2, i) * 1000
      await wait(delay)
    }
  }
}

export const safeJsonParse = (json: string): unknown => {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export const createDocumentId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
