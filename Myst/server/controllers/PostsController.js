import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger.js'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.deletePost)
  }

  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const post = await postsService.createPost(req.body)
      post.creator = req.account
      res.send(post)
    } catch (error) {
      next(error)
      logger.error('create post error', Error)
    }
  }

  async deletePost(req, res, next) {
    try {
      const post = await postsService.deletePost(req.params.postId)
      res.send(post)
    } catch (error) {
      next(error)
      logger.error('delete post error', Error)
    }
  }
}
