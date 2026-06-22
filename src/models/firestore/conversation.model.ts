import { FirestoreDocument, baseFirestoreDocument } from './common.types'

export type ConversationType = 'direct' | 'group'

export interface Conversation extends FirestoreDocument {
  readonly title: string | null
  readonly conversationType: ConversationType
  readonly participantIds: readonly string[]
  readonly lastMessageAt: Date | null
  readonly lastMessageAuthorId: string | null
  readonly lastMessagePreview: string | null
  readonly icon: string | null
}

export const validateConversation = (data: unknown): data is Omit<Conversation, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    (obj.title === null || typeof obj.title === 'string') &&
    (obj.conversationType === 'direct' || obj.conversationType === 'group') &&
    Array.isArray(obj.participantIds) &&
    (obj.lastMessageAt === null || obj.lastMessageAt instanceof Date) &&
    (obj.lastMessageAuthorId === null || typeof obj.lastMessageAuthorId === 'string') &&
    (obj.lastMessagePreview === null || typeof obj.lastMessagePreview === 'string') &&
    (obj.icon === null || typeof obj.icon === 'string')
  )
}

export const createConversation = (
  participantIds: string[],
  creatorId: string,
  type: ConversationType = 'direct',
  title: string | null = null,
): Omit<Conversation, 'id'> => ({
  ...baseFirestoreDocument(creatorId),
  title,
  conversationType: type,
  participantIds,
  lastMessageAt: null,
  lastMessageAuthorId: null,
  lastMessagePreview: null,
  icon: null,
})
