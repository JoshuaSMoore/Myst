
import { AppState } from '../AppState'
import { Comment } from '../models/Comment.js'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'

class CommentsService {
  async createComment(postId, data) {
    const res = await api.post(`api/posts/${postId}/comments`, data)
    logger.log('comment done did', res.data)
    AppState.comments.unshift(new Comment(res.data))
  }

  async getCommentByPostId(postId) {
    AppState.comments = []
    try {
      const res = await api.get(`api/posts/${postId}/comments`)
      logger.log('your data for comments', res.data)
      AppState.comments = res.data
      logger.log(AppState.comments)
    } catch (error) {
      Pop.toast(error.message)
    }
  }

  async editComment(postId, commentId, comment) {
    const res = await api.put(`api/posts/${postId}/comments/${commentId}`, comment)
    logger.log('did the edit work', res.data)
    AppState.commet = new Comment(res.data)
    logger.log(AppState.comments)
  }

  async deleteComment(postId, commentId, comment) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete(`api/posts/${postId}/comments/${commentId}`, comment)
        Pop.toast('Comment Deleted', 'success')
        AppState.comments = AppState.comments.filter(c => c.id !== commentId)
        logger.log('the res for delete comment', res)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const commentsService = new CommentsService()
