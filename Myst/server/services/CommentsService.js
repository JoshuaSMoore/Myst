import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'

class CommentsService {
  async getComments(postId) {
    const comments = await dbContext.Comment.find({ postId }).populate('creator').populate('post')
    return comments
  }

  async editComment(commentId, userId, newComment) {
    const comment = await dbContext.Comment.findById(commentId)
    if (userId !== comment.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    comment.body = newComment.body || comment.body
    await comment.save()
    return comment
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comment.findById(commentId)
    if (userId !== comment.creatorId.toString()) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    await comment.remove()
    return comment
  }

  async createComment(body) {
    const comment = await dbContext.Comment.create(body)
    await comment.populate('creator')
    await comment.populate('post')
    return comment
  }
}

export const commentsService = new CommentsService()
