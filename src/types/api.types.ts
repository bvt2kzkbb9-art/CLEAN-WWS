import { AppError } from './error.types'

export interface ApiResponse<T> {
  data: T | null
  error: AppError | null
  loading: boolean
}

export interface PaginationParams {
  limit: number
  offset: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

export interface CrudOperations<T> {
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  read(id: string): Promise<T | null>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
  list(params?: Partial<PaginationParams>): Promise<PaginatedResponse<T>>
}

export interface ListenerUnsubscribe {
  (): void
}

export interface RealtimeOptions {
  includeDeleted?: boolean
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
