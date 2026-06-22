export * from './error.types'
export * from './api.types'

// Legacy types (to be refactored in future phases)
export interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  bio?: string
  createdAt: Date
  updatedAt: Date
  role: 'user' | 'admin'
  isActive: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  category: string
  image: string
  participants: number
  date: Date
  creator: string
}

export interface Post {
  id: string
  content: string
  image?: string
  creator: string
  likes: number
  comments: number
  createdAt: Date
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
  read: boolean
}
