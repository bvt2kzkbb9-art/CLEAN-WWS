import { FirestoreDocument, baseFirestoreDocument } from './common.types'

export type MessageType = 'text' | 'image' | 'system'

export interface Message extends FirestoreDocument {
  readonly conversationId: string
  readonly senderId: string
  readonly content: string
  readonly messageType: MessageType
  readonly attachments: readonly string[]
  readonly readBy: readonly string[]
  readonly isEdited: boolean
  readonly editedAt: Date | null
  readonly replyToId: string | null
}

export const validateMessage = (data: unknown): data is Omit<Message, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.conversationId === 'string' &&
    typeof obj.senderId === 'string' &&
    typeof obj.content === 'string' &&
    ['text', 'image', 'system'].includes(obj.messageType as string) &&
    Array.isArray(obj.attachments) &&
    Array.isArray(obj.readBy) &&
    typeof obj.isEdited === 'boolean' &&
    (obj.editedAt === null || obj.editedAt instanceof Date) &&
    (typeof obj.replyToId === 'string' || obj.replyToId === null)
  )
}

export const createMessage = (
  conversationId: string,
  senderId: string,
  content: string,
  messageType: MessageType = 'text',
  attachments: string[] = [],
): Omit<Message, 'id'> => ({
  ...baseFirestoreDocument(senderId),
  conversationId,
  senderId,
  content,
  messageType,
  attachments,
  readBy: [senderId],
  isEdited: false,
  editedAt: null,
  replyToId: null,
})
