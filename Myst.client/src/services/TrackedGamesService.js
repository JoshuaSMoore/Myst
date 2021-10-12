import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class TrackedGamesService {
  async createTrackedGame(gameId) {
    const body = {}
    body.gameId = gameId
    const res = await api.post('api/trackedgames', body)
    logger.log('createTrackedGame', res)
  }
}

export const trackedGamesService = new TrackedGamesService()
