import { useCallback } from 'react'
import { messageService, Message, MessageType } from '@/services'
import { useFirestore, UseFirestoreReturn } from './useFirestore'

export interface UseMessagesReturn extends UseFirestoreReturn<Message> {
  createMessage: (
    conversationId: string,
    senderId: string,
    content: string,
    messageType?: MessageType,
    attachments?: string[],
  ) => Promise<Message>
  getMessagesByConversation: (conversationId: string) => Promise<Message[]>
  markAsRead: (messageId: string, userId: string) => Promise<Message>
  editMessage: (messageId: string, content: string) => Promise<Message>
  getUnreadMessages: (conversationId: string, userId: string) => Promise<Message[]>
}

export const useMessages = (): UseMessagesReturn => {
  const firestoreReturn = useFirestore(messageService)

  const createMessage = useCallback(
    async (
      conversationId: string,
      senderId: string,
      content: string,
      messageType: MessageType = 'text',
      attachments: string[] = [],
    ) => {
      return messageService.createMessage(conversationId, senderId, content, messageType, attachments)
    },
    [],
  )

  const getMessagesByConversation = useCallback(
    async (conversationId: string) => {
      return messageService.getMessagesByConversation(conversationId)
    },
    [],
  )

  const markAsRead = useCallback(
    async (messageId: string, userId: string) => {
      return messageService.markAsRead(messageId, userId)
    },
    [],
  )

  const editMessage = useCallback(
    async (messageId: string, content: string) => {
      return messageService.editMessage(messageId, content)
    },
    [],
  )

  const getUnreadMessages = useCallback(
    async (conversationId: string, userId: string) => {
      return messageService.getUnreadMessages(conversationId, userId)
    },
    [],
  )

  return {
    ...firestoreReturn,
    createMessage,
    getMessagesByConversation,
    markAsRead,
    editMessage,
    getUnreadMessages,
  }
}
