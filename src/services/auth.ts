import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { User } from '../types'

/**
 * Register user with email and password
 * Creates user in Firebase Auth and document in Firestore
 */
export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Create user document in Firestore
    const userData: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || email,
      displayName,
      photoURL: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      isActive: true,
    }

    // Save to Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return userData
  } catch (error) {
    throw new Error(`Registration failed: ${getErrorMessage(error)}`)
  }
}

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw new Error(`Login failed: ${getErrorMessage(error)}`)
  }
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(`Logout failed: ${getErrorMessage(error)}`)
  }
}

/**
 * Subscribe to auth state changes
 * Callback is called whenever user logs in/out
 */
export function onAuthStateChange(callback: (user: FirebaseUser | null) => void): () => void {
  return onAuthStateChanged(auth, callback)
}

/**
 * Enable persistence so user stays logged in after page reload
 */
export async function enablePersistence(): Promise<void> {
  try {
    await setPersistence(auth, browserLocalPersistence)
  } catch (error) {
    console.warn('Failed to enable persistence:', getErrorMessage(error))
  }
}

/**
 * Get user document from Firestore
 */
export async function getUserDocument(uid: string): Promise<User | null> {
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
    throw new Error(`Failed to get user: ${getErrorMessage(error)}`)
  }
}

/**
 * Convert Firebase error codes to user-friendly messages
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message

    // Firebase auth error codes
    if (message.includes('auth/email-already-in-use')) {
      return 'This email is already registered'
    }
    if (message.includes('auth/weak-password')) {
      return 'Password is too weak (minimum 6 characters)'
    }
    if (message.includes('auth/invalid-email')) {
      return 'Invalid email address'
    }
    if (message.includes('auth/user-not-found')) {
      return 'User not found'
    }
    if (message.includes('auth/wrong-password')) {
      return 'Incorrect password'
    }
    if (message.includes('auth/too-many-requests')) {
      return 'Too many login attempts. Try again later'
    }

    return message
  }

  return 'Unknown error occurred'
}
