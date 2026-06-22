import { useCallback } from 'react'
import { profileService, Profile } from '@/services'
import { useFirestore, UseFirestoreReturn } from './useFirestore'

export interface UseProfileReturn extends UseFirestoreReturn<Profile> {
  updateBio: (bio: string) => Promise<Profile>
  updateAvatar: (avatarUrl: string) => Promise<Profile>
  updateCoverImage: (coverImageUrl: string) => Promise<Profile>
  updateSocialLinks: (links: Partial<{
    instagram: string | null
    twitter: string | null
    facebook: string | null
    website: string | null
  }>) => Promise<Profile>
  updateInterests: (interests: string[]) => Promise<Profile>
}

export const useProfile = (): UseProfileReturn => {
  const firestoreReturn = useFirestore(profileService)

  const updateBio = useCallback(
    async (bio: string) => {
      if (!firestoreReturn.data?.id) {
        throw new Error('No profile loaded')
      }
      return profileService.updateBio(firestoreReturn.data.id, bio)
    },
    [firestoreReturn.data?.id],
  )

  const updateAvatar = useCallback(
    async (avatarUrl: string) => {
      if (!firestoreReturn.data?.id) {
        throw new Error('No profile loaded')
      }
      return profileService.updateAvatar(firestoreReturn.data.id, avatarUrl)
    },
    [firestoreReturn.data?.id],
  )

  const updateCoverImage = useCallback(
    async (coverImageUrl: string) => {
      if (!firestoreReturn.data?.id) {
        throw new Error('No profile loaded')
      }
      return profileService.updateCoverImage(firestoreReturn.data.id, coverImageUrl)
    },
    [firestoreReturn.data?.id],
  )

  const updateSocialLinks = useCallback(
    async (links: any) => {
      if (!firestoreReturn.data?.id) {
        throw new Error('No profile loaded')
      }
      return profileService.updateSocialLinks(firestoreReturn.data.id, links)
    },
    [firestoreReturn.data?.id],
  )

  const updateInterests = useCallback(
    async (interests: string[]) => {
      if (!firestoreReturn.data?.id) {
        throw new Error('No profile loaded')
      }
      return profileService.updateInterests(firestoreReturn.data.id, interests)
    },
    [firestoreReturn.data?.id],
  )

  return {
    ...firestoreReturn,
    updateBio,
    updateAvatar,
    updateCoverImage,
    updateSocialLinks,
    updateInterests,
  }
}
