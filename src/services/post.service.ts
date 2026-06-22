import { BaseService } from './base.service'
import { Post, createPost } from '@/models/firestore'

export class PostService extends BaseService<Post> {
  protected collectionName = 'posts'

  private static instance: PostService

  private constructor() {
    super()
  }

  static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService()
    }
    return PostService.instance
  }

  async createPost(content: string, authorId: string, images: string[] = []): Promise<Post> {
    const postData = createPost(content, authorId, images)
    return this.create(postData)
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    return this.findBy('authorId', authorId)
  }

  async updatePostContent(postId: string, content: string): Promise<Post> {
    return this.update(postId, {
      content,
      isEdited: true,
      editedAt: new Date(),
    } as Partial<Post>)
  }

  async incrementLikeCount(postId: string): Promise<void> {
    const post = await this.read(postId)
    if (post) {
      await this.update(postId, { likesCount: post.likesCount + 1 } as Partial<Post>)
    }
  }

  async decrementLikeCount(postId: string): Promise<void> {
    const post = await this.read(postId)
    if (post && post.likesCount > 0) {
      await this.update(postId, { likesCount: post.likesCount - 1 } as Partial<Post>)
    }
  }

  async incrementCommentCount(postId: string): Promise<void> {
    const post = await this.read(postId)
    if (post) {
      await this.update(postId, { commentsCount: post.commentsCount + 1 } as Partial<Post>)
    }
  }

  async decrementCommentCount(postId: string): Promise<void> {
    const post = await this.read(postId)
    if (post && post.commentsCount > 0) {
      await this.update(postId, { commentsCount: post.commentsCount - 1 } as Partial<Post>)
    }
  }

  async incrementShareCount(postId: string): Promise<void> {
    const post = await this.read(postId)
    if (post) {
      await this.update(postId, { sharesCount: post.sharesCount + 1 } as Partial<Post>)
    }
  }

  async pinPost(postId: string): Promise<Post> {
    return this.update(postId, { isPinned: true } as Partial<Post>)
  }

  async unpinPost(postId: string): Promise<Post> {
    return this.update(postId, { isPinned: false } as Partial<Post>)
  }
}

export const postService = PostService.getInstance()
