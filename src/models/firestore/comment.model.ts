import { FirestoreDocument, baseFirestoreDocument } from './common.types'

export interface Comment extends FirestoreDocument {
  readonly postId: string
  readonly content: string
  readonly authorId: string
  readonly likesCount: number
  readonly repliesCount: number
  readonly parentCommentId: string | null
  readonly isEdited: boolean
  readonly editedAt: Date | null
}

export const validateComment = (data: unknown): data is Omit<Comment, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.postId === 'string' &&
    typeof obj.content === 'string' &&
    typeof obj.authorId === 'string' &&
    typeof obj.likesCount === 'number' &&
    typeof obj.repliesCount === 'number' &&
    (typeof obj.parentCommentId === 'string' || obj.parentCommentId === null) &&
    typeof obj.isEdited === 'boolean' &&
    (obj.editedAt === null || obj.editedAt instanceof Date)
  )
}

export const createComment = (
  postId: string,
  content: string,
  authorId: string,
  parentCommentId: string | null = null,
): Omit<Comment, 'id'> => ({
  ...baseFirestoreDocument(authorId),
  postId,
  content,
  authorId,
  likesCount: 0,
  repliesCount: 0,
  parentCommentId,
  isEdited: false,
  editedAt: null,
})
