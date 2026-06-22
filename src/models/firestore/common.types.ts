export type Timestamp = {
  readonly seconds: number
  readonly nanoseconds: number
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
  PENDING = 'PENDING',
}

export enum UserRole {
  USER = 'USER',
  ORGANIZER = 'ORGANIZER',
  ADMIN = 'ADMIN',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ParticipantStatus {
  INVITED = 'INVITED',
  GOING = 'GOING',
  INTERESTED = 'INTERESTED',
  NOT_GOING = 'NOT_GOING',
}

export interface FirestoreDocument {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly deletedAt?: Date | null
  readonly createdBy: string
  readonly status: Status
}

export const baseFirestoreDocument = (userId: string): Omit<FirestoreDocument, 'id'> => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  createdBy: userId,
  status: Status.ACTIVE,
})
