import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAYXNZpIPSfKFadra4acBTmr4QovjngGWc',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'cleanwws.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cleanwws',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'cleanwws.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '607922965408',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:607922965408:web:25292ff772e5b8c258b2c5',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
