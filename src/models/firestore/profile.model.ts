import { FirestoreDocument, baseFirestoreDocument } from './common.types'

export interface Profile extends FirestoreDocument {
  readonly userId: string
  readonly bio: string
  readonly avatar: string | null
  readonly coverImage: string | null
  readonly location: string
  readonly website: string | null
  readonly instagram: string | null
  readonly twitter: string | null
  readonly facebook: string | null
  readonly interests: readonly string[]
  readonly eventsCount: number
  readonly postsCount: number
  readonly followersCount: number
  readonly followingCount: number
  readonly isVerified: boolean
}

export const validateProfile = (data: unknown): data is Omit<Profile, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.userId === 'string' &&
    typeof obj.bio === 'string' &&
    (obj.avatar === null || typeof obj.avatar === 'string') &&
    (obj.coverImage === null || typeof obj.coverImage === 'string') &&
    typeof obj.location === 'string' &&
    (obj.website === null || typeof obj.website === 'string') &&
    (obj.instagram === null || typeof obj.instagram === 'string') &&
    (obj.twitter === null || typeof obj.twitter === 'string') &&
    (obj.facebook === null || typeof obj.facebook === 'string') &&
    Array.isArray(obj.interests) &&
    typeof obj.eventsCount === 'number' &&
    typeof obj.postsCount === 'number' &&
    typeof obj.followersCount === 'number' &&
    typeof obj.followingCount === 'number' &&
    typeof obj.isVerified === 'boolean'
  )
}

export const createProfile = (userId: string): Omit<Profile, 'id'> => ({
  ...baseFirestoreDocument(userId),
  userId,
  bio: '',
  avatar: null,
  coverImage: null,
  location: '',
  website: null,
  instagram: null,
  twitter: null,
  facebook: null,
  interests: [],
  eventsCount: 0,
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
  isVerified: false,
})
