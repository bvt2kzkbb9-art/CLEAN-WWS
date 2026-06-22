// User types
export interface User {
  id: string
  email: string
  displayName: string
  avatar?: string
  bio?: string
  createdAt: Date
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
