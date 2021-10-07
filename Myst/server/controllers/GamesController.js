import BaseController from '../utils/BaseController.js'
// import { logger } from '../utils/Logger.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { gamesService } from '../services/GamesService.js'

export class GamesController extends BaseController {
  constructor() {
    super('api/games')
    this.router
      .get('', this.getGames)
      .get('/:gameId', this.getGamesById)
      .get('/:gameId/trackedgames', this.getTrackedGames)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async getGames(req, res, next) {
    try {
      const games = await gamesService.getGames(req.query)
      res.send(games)
    } catch (error) {
      next(error, '💀 getGames server games controller')
    }
  }

  async getGamesById(req, res, next) {
    try {
      const game = await gamesService.getGamesById(req.params.gameId)
      res.send(game)
    } catch (error) {
      next(error, '💀get getGamesById server games controller')
    }
  }

  async getTrackedGames(req, res, next) {
    try {
      const games = await gamesService.getTrackedGames(req.params.gameId)
      res.send(games)
    } catch (error) {
      next(error, '💀get trackedGames server games controller')
    }
  }
}
