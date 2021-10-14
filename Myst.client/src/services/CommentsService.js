import { AppState } from '../AppState'
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

  async editComment(postId, commentId) {
    const res = await api.put(`api/posts/${postId}/comments/${commentId}`)
    logger.log('did the edit work', res.data)
    AppState.comments = res.data
    logger.log(AppState.comments)
  }

  async deleteComment(commentId) {
    await commentsService.deleteComment(commentId)
  }
}

export const commentsService = new CommentsService()
