import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { User } from '../types'

/**
 * Update user profile information
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<User>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    throw new Error(`Failed to update profile: ${error}`)
  }
}

/**
 * Get user profile by UID
 */
export async function getUserProfile(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (!userDoc.exists()) {
      return null
    }

    const data = userDoc.data()
    return {
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : data.updatedAt,
    } as User
  } catch (error) {
    throw new Error(`Failed to get user profile: ${error}`)
  }
}

/**
 * Deactivate user account
 */
export async function deactivateUserAccount(uid: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      isActive: false,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    throw new Error(`Failed to deactivate account: ${error}`)
  }
}

/**
 * Reactivate user account
 */
export async function reactivateUserAccount(uid: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      isActive: true,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    throw new Error(`Failed to reactivate account: ${error}`)
  }
}
