import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { trackedGamesService } from '../services/TrackedGamesService'

export class TrackedGamesController extends BaseController {
  constructor() {
    super('api/trackedgames')
    this.router
      .post('', this.createTrackedGame)
      .get('/:trackedGameId', this.getTrackedGameById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:trackedGameId', this.favoriteTrackedGame)
      .delete('/:trackedGameId', this.deleteTrackedGame)
  }

  async createTrackedGame(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const trackedGame = await trackedGamesService.createTrackedGame(req.body)
      res.send(trackedGame)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedGameById(req, res, next) {
    try {
      const trackedGame = await trackedGamesService.getTrackedGameById(req.params.trackedGameId)
      res.send(trackedGame)
    } catch (error) {
      next(error)
    }
  }

  async favoriteTrackedGame(req, res, next) {
    try {
      const favoritedGame = await trackedGamesService.favoriteTrackedGame(req.params.trackedGameId)
      res.send(favoritedGame)
    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedGame(req, res, next) {
    try {
      const deletedGame = await trackedGamesService.deleteTrackedGame(req.params.trackedGameId)
      res.send(deletedGame)
      res.send(deletedGame)
    } catch (error) {
      next(error)
    }
  }
}
