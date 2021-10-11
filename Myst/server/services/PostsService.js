import { dbContext } from '../db/DbContext.js'

class PostsService {
  async createPost(postData) {
    const post = await dbContext.Post.create(postData)
    await post.populate('creator', 'name picture')
    return post
  }

  async deletePost(postId) {
    const post = await dbContext.Post.findByIdAndDelete(postId)
    return post
  }
}

export const postsService = new PostsService()
