import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { commentsService } from '../services/CommentsService.js'

export class CommentsController extends BaseController {
  constructor() {
    super('api/posts/:postId/comments')
    this.router
      .get('', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .put('/:commentId', this.editComment)
      .delete('/:commentId', this.deleteComment)
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments(req.query.postId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const comment = await commentsService.editComment(req.params.commentId, req.userInfo.id, req.body)
      res.sent(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
