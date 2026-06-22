import { BaseService } from './base.service'
import { Profile, createProfile } from '@/models/firestore'
import { doc, setDoc } from 'firebase/firestore'
import { getFirebaseDb } from '@/utils/firebase.config'

export class ProfileService extends BaseService<Profile> {
  protected collectionName = 'profiles'

  private static instance: ProfileService

  private constructor() {
    super()
  }

  static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }

  async createProfile(userId: string): Promise<Profile> {
    const profileData = createProfile(userId)
    const docData = {
      id: userId,
      ...profileData,
    }
    const docRef = doc(getFirebaseDb(), this.collectionName, userId)
    await setDoc(docRef, docData)
    return docData as unknown as Profile
  }

  async updateBio(userId: string, bio: string): Promise<Profile> {
    return this.update(userId, { bio } as Partial<Profile>)
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<Profile> {
    return this.update(userId, { avatar: avatarUrl } as Partial<Profile>)
  }

  async updateCoverImage(userId: string, coverImageUrl: string): Promise<Profile> {
    return this.update(userId, { coverImage: coverImageUrl } as Partial<Profile>)
  }

  async updateSocialLinks(
    userId: string,
    links: Partial<{
      instagram: string | null
      twitter: string | null
      facebook: string | null
      website: string | null
    }>,
  ): Promise<Profile> {
    return this.update(userId, links as Partial<Profile>)
  }

  async updateInterests(userId: string, interests: string[]): Promise<Profile> {
    return this.update(userId, { interests } as Partial<Profile>)
  }

  async incrementEventCount(userId: string): Promise<void> {
    const profile = await this.read(userId)
    if (profile) {
      await this.update(userId, { eventsCount: profile.eventsCount + 1 } as Partial<Profile>)
    }
  }

  async decrementEventCount(userId: string): Promise<void> {
    const profile = await this.read(userId)
    if (profile && profile.eventsCount > 0) {
      await this.update(userId, { eventsCount: profile.eventsCount - 1 } as Partial<Profile>)
    }
  }

  async incrementPostCount(userId: string): Promise<void> {
    const profile = await this.read(userId)
    if (profile) {
      await this.update(userId, { postsCount: profile.postsCount + 1 } as Partial<Profile>)
    }
  }

  async decrementPostCount(userId: string): Promise<void> {
    const profile = await this.read(userId)
    if (profile && profile.postsCount > 0) {
      await this.update(userId, { postsCount: profile.postsCount - 1 } as Partial<Profile>)
    }
  }
}

export const profileService = ProfileService.getInstance()
