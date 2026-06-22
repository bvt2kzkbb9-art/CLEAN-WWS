import { BaseService } from './base.service'
import { Message, MessageType, createMessage } from '@/models/firestore'

export class MessageService extends BaseService<Message> {
  protected collectionName = 'messages'

  private static instance: MessageService

  private constructor() {
    super()
  }

  static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService()
    }
    return MessageService.instance
  }

  async createMessage(
    conversationId: string,
    senderId: string,
    content: string,
    messageType: MessageType = 'text',
    attachments: string[] = [],
  ): Promise<Message> {
    const messageData = createMessage(conversationId, senderId, content, messageType, attachments)
    return this.create(messageData)
  }

  async getMessagesByConversation(conversationId: string): Promise<Message[]> {
    return this.findBy('conversationId', conversationId)
  }

  async markAsRead(messageId: string, userId: string): Promise<Message> {
    const message = await this.read(messageId)
    if (message && !message.readBy.includes(userId)) {
      const updatedReadBy = [...message.readBy, userId]
      return this.update(messageId, { readBy: updatedReadBy } as Partial<Message>)
    }
    return message as Message
  }

  async editMessage(messageId: string, content: string): Promise<Message> {
    return this.update(messageId, {
      content,
      isEdited: true,
      editedAt: new Date(),
    } as Partial<Message>)
  }

  async setReplyTo(messageId: string, replyToId: string): Promise<Message> {
    return this.update(messageId, { replyToId } as Partial<Message>)
  }

  async getUnreadMessages(conversationId: string, userId: string): Promise<Message[]> {
    const messages = await this.getMessagesByConversation(conversationId)
    return messages.filter((msg) => !msg.readBy.includes(userId))
  }
}

export const messageService = MessageService.getInstance()
