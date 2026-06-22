import { FirestoreDocument, baseFirestoreDocument } from './common.types'

export type LikeableType = 'post' | 'comment'

export interface Like extends FirestoreDocument {
  readonly targetId: string
  readonly targetType: LikeableType
  readonly userId: string
}

export const validateLike = (data: unknown): data is Omit<Like, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.targetId === 'string' &&
    (obj.targetType === 'post' || obj.targetType === 'comment') &&
    typeof obj.userId === 'string'
  )
}

export const createLike = (targetId: string, targetType: LikeableType, userId: string): Omit<Like, 'id'> => ({
  ...baseFirestoreDocument(userId),
  targetId,
  targetType,
  userId,
})
