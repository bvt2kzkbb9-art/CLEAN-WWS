import { useCallback } from 'react'
import { postService, Post } from '@/services'
import { useFirestore, UseFirestoreReturn } from './useFirestore'

export interface UsePostsReturn extends UseFirestoreReturn<Post> {
  createPost: (content: string, authorId: string, images?: string[]) => Promise<Post>
  getPostsByAuthor: (authorId: string) => Promise<Post[]>
  updatePostContent: (postId: string, content: string) => Promise<Post>
  incrementLikeCount: (postId: string) => Promise<void>
  decrementLikeCount: (postId: string) => Promise<void>
  pinPost: (postId: string) => Promise<Post>
  unpinPost: (postId: string) => Promise<Post>
}

export const usePosts = (): UsePostsReturn => {
  const firestoreReturn = useFirestore(postService)

  const createPost = useCallback(
    async (content: string, authorId: string, images: string[] = []) => {
      return postService.createPost(content, authorId, images)
    },
    [],
  )

  const getPostsByAuthor = useCallback(
    async (authorId: string) => {
      return postService.getPostsByAuthor(authorId)
    },
    [],
  )

  const updatePostContent = useCallback(
    async (postId: string, content: string) => {
      return postService.updatePostContent(postId, content)
    },
    [],
  )

  const incrementLikeCount = useCallback(
    async (postId: string) => {
      return postService.incrementLikeCount(postId)
    },
    [],
  )

  const decrementLikeCount = useCallback(
    async (postId: string) => {
      return postService.decrementLikeCount(postId)
    },
    [],
  )

  const pinPost = useCallback(
    async (postId: string) => {
      return postService.pinPost(postId)
    },
    [],
  )

  const unpinPost = useCallback(
    async (postId: string) => {
      return postService.unpinPost(postId)
    },
    [],
  )

  return {
    ...firestoreReturn,
    createPost,
    getPostsByAuthor,
    updatePostContent,
    incrementLikeCount,
    decrementLikeCount,
    pinPost,
    unpinPost,
  }
}
