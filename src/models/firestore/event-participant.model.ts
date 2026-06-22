import { FirestoreDocument, ParticipantStatus, baseFirestoreDocument } from './common.types'

export interface EventParticipant extends FirestoreDocument {
  readonly eventId: string
  readonly userId: string
  readonly participantStatus: ParticipantStatus
  readonly joinedAt: Date
  readonly isHost: boolean
  readonly rating: number | null
  readonly review: string | null
}

export const validateEventParticipant = (data: unknown): data is Omit<EventParticipant, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  const statusCheck = typeof obj.participantStatus === 'string' && Object.values(ParticipantStatus).includes(obj.participantStatus as any)
  return (
    typeof obj.eventId === 'string' &&
    typeof obj.userId === 'string' &&
    statusCheck &&
    obj.joinedAt instanceof Date &&
    typeof obj.isHost === 'boolean' &&
    (typeof obj.rating === 'number' || obj.rating === null) &&
    (typeof obj.review === 'string' || obj.review === null)
  )
}

export const createEventParticipant = (
  eventId: string,
  userId: string,
  status: ParticipantStatus = ParticipantStatus.GOING,
  isHost: boolean = false,
): Omit<EventParticipant, 'id'> => ({
  ...baseFirestoreDocument(userId),
  eventId,
  userId,
  participantStatus: status,
  joinedAt: new Date(),
  isHost,
  rating: null,
  review: null,
})
