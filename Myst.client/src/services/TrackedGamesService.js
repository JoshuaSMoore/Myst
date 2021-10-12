import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { gamesSearchService } from './GamesSearchService.js'

class TrackedGamesService {
  async createTrackedGame(gameId) {
    const body = {}
    body.gameId = gameId
    const res = await api.post('api/trackedgames', body)
    logger.log('createTrackedGame', res)
  }

  async getTrackedGames() {
    const tracked = AppState.trackedGames
    tracked.forEach(async t => {
      const game = await gamesSearchService.getGameById(t.gameId)
      AppState.trackedGames = [...AppState.followedGames, game]
      logger.log('here trackedGames', AppState.trackedGames)
    })
  }
}

export const trackedGamesService = new TrackedGamesService()
