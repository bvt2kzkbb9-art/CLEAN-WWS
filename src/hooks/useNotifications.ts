import { useCallback } from 'react'
import { notificationService, Notification, NotificationType } from '@/services'
import { useFirestore, UseFirestoreReturn } from './useFirestore'

export interface UseNotificationsReturn extends UseFirestoreReturn<Notification> {
  createNotification: (
    recipientId: string,
    notificationType: NotificationType,
    title: string,
    message: string,
    senderId?: string | null,
    targetId?: string | null,
  ) => Promise<Notification>
  getNotificationsByRecipient: (recipientId: string) => Promise<Notification[]>
  getUnreadNotifications: (recipientId: string) => Promise<Notification[]>
  markAsRead: (notificationId: string) => Promise<Notification>
  markAllAsRead: (recipientId: string) => Promise<void>
  getUnreadCount: (recipientId: string) => Promise<number>
}

export const useNotifications = (): UseNotificationsReturn => {
  const firestoreReturn = useFirestore(notificationService)

  const createNotification = useCallback(
    async (
      recipientId: string,
      notificationType: NotificationType,
      title: string,
      message: string,
      senderId: string | null = null,
      targetId: string | null = null,
    ) => {
      return notificationService.createNotification(
        recipientId,
        notificationType,
        title,
        message,
        senderId,
        targetId,
      )
    },
    [],
  )

  const getNotificationsByRecipient = useCallback(
    async (recipientId: string) => {
      return notificationService.getNotificationsByRecipient(recipientId)
    },
    [],
  )

  const getUnreadNotifications = useCallback(
    async (recipientId: string) => {
      return notificationService.getUnreadNotifications(recipientId)
    },
    [],
  )

  const markAsRead = useCallback(
    async (notificationId: string) => {
      return notificationService.markAsRead(notificationId)
    },
    [],
  )

  const markAllAsRead = useCallback(
    async (recipientId: string) => {
      return notificationService.markAllAsRead(recipientId)
    },
    [],
  )

  const getUnreadCount = useCallback(
    async (recipientId: string) => {
      return notificationService.getUnreadCount(recipientId)
    },
    [],
  )

  return {
    ...firestoreReturn,
    createNotification,
    getNotificationsByRecipient,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
  }
}
