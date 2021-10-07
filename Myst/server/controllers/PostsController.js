import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import {import} from '../utils/Logger'
export class PostController extends BaseController {
  constructor() {
    super('api')
    this.router
      .use()
      .get()
      .post()
      .delete()
  }

  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.account.id
    } catch (error) {
      next(error)
    }
  }
}