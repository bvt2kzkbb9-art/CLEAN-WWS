import {
  getFirebaseDb,
} from '@/utils/firebase.config'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  getDocs,
  QueryConstraint,
} from 'firebase/firestore'
import { AppError, ErrorCode, PaginatedResponse, PaginationParams } from '@/types'
import { handleFirebaseError, exponentialBackoff } from '@/utils/firebase.helpers'
import { FirestoreDocument } from '@/models/firestore'

export abstract class BaseService<T extends FirestoreDocument> {
  protected abstract collectionName: string

  protected getCollection() {
    return collection(getFirebaseDb(), this.collectionName)
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    try {
      return (await exponentialBackoff(async () => {
        const docRef = doc(this.getCollection())
        const docData = {
          ...data,
          id: docRef.id,
        }
        await setDoc(docRef, docData)
        return docData as T
      })) as T
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async read(id: string): Promise<T | null> {
    try {
      return (await exponentialBackoff(async () => {
        const docRef = doc(this.getCollection(), id)
        const docSnap = await getDoc(docRef)
        return (docSnap.exists() ? docSnap.data() : null) as T | null
      })) as T | null
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      return (await exponentialBackoff(async () => {
        const docRef = doc(this.getCollection(), id)
        const updateData = {
          ...data,
          updatedAt: new Date(),
        }
        await updateDoc(docRef, updateData)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          throw new AppError(ErrorCode.NOT_FOUND, 'Document not found after update')
        }
        return docSnap.data() as T
      })) as T
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await exponentialBackoff(async () => {
        const docRef = doc(this.getCollection(), id)
        await deleteDoc(docRef)
      })
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async list(params?: Partial<PaginationParams>): Promise<PaginatedResponse<T>> {
    try {
      return (await exponentialBackoff(async () => {
        const { limit: pageLimit = 20, offset: pageOffset = 0 } = params || {}
        const constraints: QueryConstraint[] = [where('status', '!=', 'DELETED')]

        if (pageLimit) {
          constraints.push(limit(pageLimit + 1))
        }

        const q = query(this.getCollection(), ...constraints)
        const querySnapshot = await getDocs(q)
        const allItems = querySnapshot.docs.map((doc) => doc.data() as T)
        const items = allItems.slice(pageOffset, pageOffset + pageLimit)
        const hasMore = allItems.length > pageOffset + pageLimit

        return {
          items,
          total: allItems.length,
          limit: pageLimit,
          offset: pageOffset,
          hasMore,
        }
      })) as PaginatedResponse<T>
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  protected async findBy(fieldName: string, value: unknown): Promise<T[]> {
    try {
      return (await exponentialBackoff(async () => {
        const q = query(
          this.getCollection(),
          where(fieldName, '==', value),
          where('status', '!=', 'DELETED'),
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map((doc) => doc.data() as T)
      })) as T[]
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  protected async findOneBy(fieldName: string, value: unknown): Promise<T | null> {
    const results = await this.findBy(fieldName, value)
    return results.length > 0 ? results[0] : null
  }
}
