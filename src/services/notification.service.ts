import { BaseService } from './base.service'
import { Notification, NotificationType, createNotification } from '@/models/firestore'

export class NotificationService extends BaseService<Notification> {
  protected collectionName = 'notifications'

  private static instance: NotificationService

  private constructor() {
    super()
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async createNotification(
    recipientId: string,
    notificationType: NotificationType,
    title: string,
    message: string,
    senderId: string | null = null,
    targetId: string | null = null,
  ): Promise<Notification> {
    const notificationData = createNotification(
      recipientId,
      notificationType,
      title,
      message,
      senderId,
      targetId,
    )
    return this.create(notificationData)
  }

  async getNotificationsByRecipient(recipientId: string): Promise<Notification[]> {
    return this.findBy('recipientId', recipientId)
  }

  async getUnreadNotifications(recipientId: string): Promise<Notification[]> {
    const notifications = await this.getNotificationsByRecipient(recipientId)
    return notifications.filter((n) => !n.isRead)
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.update(notificationId, {
      isRead: true,
      readAt: new Date(),
    } as Partial<Notification>)
  }

  async markAllAsRead(recipientId: string): Promise<void> {
    const notifications = await this.getUnreadNotifications(recipientId)
    for (const notification of notifications) {
      await this.markAsRead(notification.id)
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await this.delete(notificationId)
  }

  async deleteAllNotifications(recipientId: string): Promise<void> {
    const notifications = await this.getNotificationsByRecipient(recipientId)
    for (const notification of notifications) {
      await this.delete(notification.id)
    }
  }

  async getUnreadCount(recipientId: string): Promise<number> {
    const unread = await this.getUnreadNotifications(recipientId)
    return unread.length
  }
}

export const notificationService = NotificationService.getInstance()
