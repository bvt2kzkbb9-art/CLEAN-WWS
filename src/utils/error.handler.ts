import { AppError, ErrorCode } from '@/types'

export class ErrorHandler {
  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError
  }

  static getErrorMessage(error: unknown): string {
    if (this.isAppError(error)) {
      return error.message
    }
    if (error instanceof Error) {
      return error.message
    }
    return 'An unknown error occurred'
  }

  static getErrorCode(error: unknown): ErrorCode {
    if (this.isAppError(error)) {
      return error.code
    }
    return ErrorCode.UNKNOWN
  }

  static isRetryable(error: unknown): boolean {
    if (this.isAppError(error)) {
      return error.isRetryable()
    }
    return false
  }

  static isPermissionError(error: unknown): boolean {
    if (this.isAppError(error)) {
      return error.isPermissionError()
    }
    return false
  }

  static isNotFound(error: unknown): boolean {
    if (this.isAppError(error)) {
      return error.isNotFound()
    }
    return false
  }

  static logError(error: unknown, context?: string): void {
    const message = this.getErrorMessage(error)
    const code = this.getErrorCode(error)
    const contextStr = context ? ` (${context})` : ''
    console.error(`[${code}]${contextStr} ${message}`, error)
  }

  static createError(code: ErrorCode, message: string, originalError?: unknown): AppError {
    return new AppError(code, message, originalError)
  }

  static createNetworkError(message: string = 'Network error occurred'): AppError {
    return this.createError(ErrorCode.NETWORK_ERROR, message)
  }

  static createNotFoundError(message: string = 'Resource not found'): AppError {
    return this.createError(ErrorCode.NOT_FOUND, message)
  }

  static createPermissionError(message: string = 'Permission denied'): AppError {
    return this.createError(ErrorCode.PERMISSION_DENIED, message)
  }

  static createTimeoutError(message: string = 'Request timed out'): AppError {
    return this.createError(ErrorCode.TIMEOUT, message)
  }
}
