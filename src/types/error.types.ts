export enum ErrorCode {
  UNKNOWN = 'UNKNOWN',
  NETWORK_ERROR = 'NETWORK_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  TIMEOUT = 'TIMEOUT',
  OFFLINE = 'OFFLINE',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public originalError?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }

  isRetryable(): boolean {
    return [
      ErrorCode.NETWORK_ERROR,
      ErrorCode.TIMEOUT,
      ErrorCode.OFFLINE,
      ErrorCode.QUOTA_EXCEEDED,
    ].includes(this.code)
  }

  isPermissionError(): boolean {
    return this.code === ErrorCode.PERMISSION_DENIED
  }

  isNotFound(): boolean {
    return this.code === ErrorCode.NOT_FOUND
  }
}

export interface FirestoreError {
  code: string
  message: string
  status?: number
}
