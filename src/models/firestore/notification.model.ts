import { FirestoreDocument, baseFirestoreDocument } from './common.types'

export type NotificationType =
  | 'post_liked'
  | 'post_commented'
  | 'comment_liked'
  | 'comment_replied'
  | 'user_followed'
  | 'event_invited'
  | 'event_updated'
  | 'message_received'
  | 'event_reminder'
  | 'system'

export interface Notification extends FirestoreDocument {
  readonly recipientId: string
  readonly senderId: string | null
  readonly notificationType: NotificationType
  readonly title: string
  readonly message: string
  readonly targetId: string | null
  readonly targetType: string | null
  readonly isRead: boolean
  readonly readAt: Date | null
  readonly icon: string | null
  readonly actionUrl: string | null
}

export const validateNotification = (data: unknown): data is Omit<Notification, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.recipientId === 'string' &&
    (obj.senderId === null || typeof obj.senderId === 'string') &&
    typeof obj.notificationType === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.message === 'string' &&
    (obj.targetId === null || typeof obj.targetId === 'string') &&
    (obj.targetType === null || typeof obj.targetType === 'string') &&
    typeof obj.isRead === 'boolean' &&
    (obj.readAt === null || obj.readAt instanceof Date) &&
    (obj.icon === null || typeof obj.icon === 'string') &&
    (obj.actionUrl === null || typeof obj.actionUrl === 'string')
  )
}

export const createNotification = (
  recipientId: string,
  notificationType: NotificationType,
  title: string,
  message: string,
  senderId: string | null = null,
  targetId: string | null = null,
): Omit<Notification, 'id'> => ({
  ...baseFirestoreDocument(senderId || recipientId),
  recipientId,
  senderId,
  notificationType,
  title,
  message,
  targetId,
  targetType: null,
  isRead: false,
  readAt: null,
  icon: null,
  actionUrl: null,
})
