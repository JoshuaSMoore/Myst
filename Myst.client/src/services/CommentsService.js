
import { AppState } from '../AppState'
import { Comment } from '../models/Comment.js'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'

class CommentsService {
  async createComment(postId, data) {
    const res = await api.post(`api/posts/${postId}/comments`, data)

    AppState.comments.unshift(new Comment(res.data))
  }

  async getCommentByPostId(postId) {
    AppState.comments = []
    try {
      const res = await api.get(`api/posts/${postId}/comments`)

      AppState.comments = res.data
    } catch (error) {
      Pop.toast(error.message)
    }
  }

  async editComment(postId, commentId, comment) {
    const res = await api.put(`api/posts/${postId}/comments/${commentId}`, comment)

    AppState.commet = new Comment(res.data)
  }

  async deleteComment(postId, commentId, comments) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete(`api/posts/${postId}/comments/${commentId}`, comments)
        Pop.toast('Comment Deleted', 'success')
        AppState.comments = AppState.comments.filter(c => c.id !== commentId)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}

export const commentsService = new CommentsService()
