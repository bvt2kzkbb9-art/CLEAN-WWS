import { FirestoreDocument, EventStatus, baseFirestoreDocument } from './common.types'

export interface Event extends FirestoreDocument {
  readonly title: string
  readonly description: string
  readonly image: string | null
  readonly location: string
  readonly latitude: number | null
  readonly longitude: number | null
  readonly startDate: Date
  readonly endDate: Date
  readonly category: string
  readonly tags: readonly string[]
  readonly organizerId: string
  readonly maxParticipants: number | null
  readonly currentParticipants: number
  readonly eventStatus: EventStatus
  readonly isPublic: boolean
  readonly commentsCount: number
}

export const validateEvent = (data: unknown): data is Omit<Event, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  const statusCheck = typeof obj.eventStatus === 'string' && Object.values(EventStatus).includes(obj.eventStatus as any)
  return (
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    (obj.image === null || typeof obj.image === 'string') &&
    typeof obj.location === 'string' &&
    (typeof obj.latitude === 'number' || obj.latitude === null) &&
    (typeof obj.longitude === 'number' || obj.longitude === null) &&
    obj.startDate instanceof Date &&
    obj.endDate instanceof Date &&
    typeof obj.category === 'string' &&
    Array.isArray(obj.tags) &&
    typeof obj.organizerId === 'string' &&
    (typeof obj.maxParticipants === 'number' || obj.maxParticipants === null) &&
    typeof obj.currentParticipants === 'number' &&
    statusCheck &&
    typeof obj.isPublic === 'boolean' &&
    typeof obj.commentsCount === 'number'
  )
}

export const createEvent = (
  title: string,
  description: string,
  location: string,
  startDate: Date,
  endDate: Date,
  organizerId: string,
  category: string = 'OTHER',
): Omit<Event, 'id'> => ({
  ...baseFirestoreDocument(organizerId),
  title,
  description,
  image: null,
  location,
  latitude: null,
  longitude: null,
  startDate,
  endDate,
  category,
  tags: [],
  organizerId,
  maxParticipants: null,
  currentParticipants: 0,
  eventStatus: EventStatus.DRAFT,
  isPublic: false,
  commentsCount: 0,
})
