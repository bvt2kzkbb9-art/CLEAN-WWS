import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { getFirebaseAuth } from '@/utils/firebase.config'
import { handleFirebaseError } from '@/utils/firebase.helpers'
import { AppError, ErrorCode } from '@/types'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export class AuthService {
  private static instance: AuthService

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async register(email: string, password: string, displayName: string): Promise<AuthUser> {
    try {
      const auth = getFirebaseAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      if (displayName) {
        await updateProfile(userCredential.user, { displayName })
      }

      return this.mapFirebaseUser(userCredential.user)
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async login(email: string, password: string): Promise<AuthUser> {
    try {
      const auth = getFirebaseAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return this.mapFirebaseUser(userCredential.user)
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async logout(): Promise<void> {
    try {
      const auth = getFirebaseAuth()
      await signOut(auth)
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      const auth = getFirebaseAuth()
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async updateDisplayName(displayName: string): Promise<void> {
    try {
      const auth = getFirebaseAuth()
      const user = auth.currentUser
      if (!user) {
        throw new AppError(ErrorCode.UNAUTHENTICATED, 'No user is currently signed in')
      }
      await updateProfile(user, { displayName })
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  async updatePhotoURL(photoURL: string): Promise<void> {
    try {
      const auth = getFirebaseAuth()
      const user = auth.currentUser
      if (!user) {
        throw new AppError(ErrorCode.UNAUTHENTICATED, 'No user is currently signed in')
      }
      await updateProfile(user, { photoURL })
    } catch (error) {
      throw handleFirebaseError(error)
    }
  }

  getCurrentUser(): AuthUser | null {
    const auth = getFirebaseAuth()
    const firebaseUser = auth.currentUser
    return firebaseUser ? this.mapFirebaseUser(firebaseUser) : null
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    const auth = getFirebaseAuth()
    return onAuthStateChanged(auth, (firebaseUser) => {
      callback(firebaseUser ? this.mapFirebaseUser(firebaseUser) : null)
    })
  }

  private mapFirebaseUser(user: FirebaseUser): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
  }
}

export const authService = AuthService.getInstance()
