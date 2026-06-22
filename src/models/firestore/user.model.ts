import { FirestoreDocument, UserRole, baseFirestoreDocument } from './common.types'

export interface User extends FirestoreDocument {
  readonly email: string
  readonly displayName: string | null
  readonly role: UserRole
  readonly emailVerified: boolean
  readonly lastSignIn: Date | null
  readonly isOnline: boolean
  readonly lastActivityAt: Date
}

export const validateUser = (data: unknown): data is Omit<User, keyof FirestoreDocument> => {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  const roleCheck = typeof obj.role === 'string' && Object.values(UserRole).includes(obj.role as any)
  return (
    typeof obj.email === 'string' &&
    (obj.displayName === null || typeof obj.displayName === 'string') &&
    roleCheck &&
    typeof obj.emailVerified === 'boolean' &&
    (obj.lastSignIn === null || obj.lastSignIn instanceof Date) &&
    typeof obj.isOnline === 'boolean' &&
    obj.lastActivityAt instanceof Date
  )
}

export const createUser = (
  email: string,
  displayName: string | null,
  userId: string,
  role: UserRole = UserRole.USER,
): Omit<User, 'id'> => ({
  ...baseFirestoreDocument(userId),
  email,
  displayName,
  role,
  emailVerified: false,
  lastSignIn: new Date(),
  isOnline: true,
  lastActivityAt: new Date(),
})
