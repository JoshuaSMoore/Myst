import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { gamesSearchService } from './GamesSearchService.js'
import axios from 'axios'

class TrackedGamesService {
  async createTrackedGame(gameId) {
    const body = {}
    body.gameId = gameId
    const res = await api.post('api/trackedgames', body)
    logger.log('createTrackedGame', res)
  }

  async getTrackedGames() {
    AppState.followedGames = []
    const tracked = AppState.trackedGames
    tracked.forEach(async t => {
      await this.getGameById(t.gameId)
    })
    logger.log('here trackedGames', AppState.followedGames)
  }

  async getGameById(id) {
    AppState.game = {}
    const game = {
      method: 'GET',
      url: `https://api.rawg.io/api/games/${id}?key=004cc6f4ef734a4a8725e3082070efd6`
    }
    axios.request(game).then(function(res) {
      logger.log(res.data)
      AppState.followedGames.push(res.data)
      logger.log('after getGameById', AppState.followedGames)
    }).catch(function(error) {
      logger.error(error)
    })
  }
}

export const trackedGamesService = new TrackedGamesService()
