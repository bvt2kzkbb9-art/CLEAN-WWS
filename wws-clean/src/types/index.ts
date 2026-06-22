// User types
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

// Event types
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

// Post types
export interface Post {
  id: string
  content: string
  image?: string
  creator: string
  likes: number
  comments: number
  createdAt: Date
}

// Message types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
  read: boolean
}
