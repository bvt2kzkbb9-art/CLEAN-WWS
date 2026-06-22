import { BaseService } from './base.service'
import { User, createUser, UserRole } from '@/models/firestore'
import { doc, setDoc } from 'firebase/firestore'
import { getFirebaseDb } from '@/utils/firebase.config'

export class UserService extends BaseService<User> {
  protected collectionName = 'users'

  private static instance: UserService

  private constructor() {
    super()
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async createUser(
    userId: string,
    email: string,
    displayName: string | null,
    role: UserRole = UserRole.USER,
  ): Promise<User> {
    const userData = createUser(email, displayName, userId, role)
    const docData = {
      id: userId,
      ...userData,
    }
    const docRef = doc(getFirebaseDb(), this.collectionName, userId)
    await setDoc(docRef, docData)
    return docData as unknown as User
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.findOneBy('email', email)
  }

  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    return this.update(userId, { role } as Partial<User>)
  }

  async updateLastActivity(userId: string): Promise<void> {
    await this.update(userId, { lastActivityAt: new Date() } as Partial<User>)
  }

  async updateOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
    await this.update(userId, { isOnline } as Partial<User>)
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.findBy('role', role)
  }
}

export const userService = UserService.getInstance()
