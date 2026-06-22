import { useState, useCallback } from 'react'
import { AppError, ErrorCode } from '@/types'
import { ErrorHandler } from '@/utils/error.handler'
import { BaseService } from '@/services'
import { FirestoreDocument } from '@/models/firestore'

export interface UseFirestoreReturn<T extends FirestoreDocument> {
  data: T | null
  items: T[]
  loading: boolean
  error: AppError | null
  create: (data: Omit<T, 'id'>) => Promise<T>
  read: (id: string) => Promise<T | null>
  update: (id: string, data: Partial<T>) => Promise<T>
  delete: (id: string) => Promise<void>
  list: () => Promise<T[]>
  refresh: () => Promise<void>
  clearError: () => void
  clearData: () => void
}

export const useFirestore = <T extends FirestoreDocument>(
  service: BaseService<T>,
): UseFirestoreReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AppError | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearData = useCallback(() => {
    setData(null)
    setItems([])
  }, [])

  const handleError = useCallback(
    (err: unknown) => {
      const appError = err instanceof AppError ? err : ErrorHandler.createError(ErrorCode.UNKNOWN, String(err), err)
      setError(appError)
      ErrorHandler.logError(err, 'useFirestore')
    },
    [],
  )

  const create = useCallback(
    async (itemData: Omit<T, 'id'>) => {
      setLoading(true)
      clearError()
      try {
        const result = await service.create(itemData)
        setData(result)
        setItems((prev) => [result, ...prev])
        return result
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [service, clearError, handleError],
  )

  const read = useCallback(
    async (id: string) => {
      setLoading(true)
      clearError()
      try {
        const result = await service.read(id)
        setData(result)
        return result
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [service, clearError, handleError],
  )

  const update = useCallback(
    async (id: string, itemData: Partial<T>) => {
      setLoading(true)
      clearError()
      try {
        const result = await service.update(id, itemData)
        setData(result)
        setItems((prev) => prev.map((item) => (item.id === id ? result : item)))
        return result
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [service, clearError, handleError],
  )

  const del = useCallback(
    async (id: string) => {
      setLoading(true)
      clearError()
      try {
        await service.delete(id)
        setItems((prev) => prev.filter((item) => item.id !== id))
        if (data?.id === id) {
          setData(null)
        }
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [service, data, clearError, handleError],
  )

  const list = useCallback(
    async () => {
      setLoading(true)
      clearError()
      try {
        const response = await service.list()
        setItems(response.items)
        return response.items
      } catch (err) {
        handleError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [service, clearError, handleError],
  )

  const refresh = useCallback(async () => {
    if (data?.id) {
      await read(data.id)
    } else {
      await list()
    }
  }, [data, read, list])

  return {
    data,
    items,
    loading,
    error,
    create,
    read,
    update,
    delete: del,
    list,
    refresh,
    clearError,
    clearData,
  }
}
