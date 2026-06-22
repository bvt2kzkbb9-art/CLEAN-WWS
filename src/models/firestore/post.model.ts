import { FirestoreDocument, baseFirestoreDocument } from './common.types'

export interface Post extends FirestoreDocument {
  readonly content: string
  readonly images: readonly string[]
  readonly authorId: string
  readonly likesCount: number
  readonly commentsCount: number
  readonly sharesCount: number
  readonly isEdited: boolean
  readonly editedAt: Date | null
  readonly isPinned: boolean
}

export const validatePost = (data: unknown): data is Omit<Post, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.content === 'string' &&
    Array.isArray(obj.images) &&
    typeof obj.authorId === 'string' &&
    typeof obj.likesCount === 'number' &&
    typeof obj.commentsCount === 'number' &&
    typeof obj.sharesCount === 'number' &&
    typeof obj.isEdited === 'boolean' &&
    (obj.editedAt === null || obj.editedAt instanceof Date) &&
    typeof obj.isPinned === 'boolean'
  )
}

export const createPost = (content: string, authorId: string, images: string[] = []): Omit<Post, 'id'> => ({
  ...baseFirestoreDocument(authorId),
  content,
  images,
  authorId,
  likesCount: 0,
  commentsCount: 0,
  sharesCount: 0,
  isEdited: false,
  editedAt: null,
  isPinned: false,
})
