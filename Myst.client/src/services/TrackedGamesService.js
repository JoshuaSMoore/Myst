import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { gamesSearchService } from './GamesSearchService.js'
import axios from 'axios'
import { accountService } from './AccountService.js'

class TrackedGamesService {
  async createTrackedGame(gameId) {
    const body = {}
    body.gameId = gameId
    const res = await api.post('api/trackedgames', body)
    logger.log('createTrackedGame', res)
    AppState.followedGames.push(res.data)
    await this.getTrackedGamesByGameId(gameId)
    this.checkTracked()
  }

  async getTrackedGames() {
    AppState.followedGames = []
    const tracked = AppState.trackedGames
    tracked.forEach(async t => {
      await this.getGameById(t.gameId)
    })
    logger.log('trackedGames TRACKEDGAMESSERVICE', AppState.followedGames)
  }

  async getGameById(id) {
    AppState.game = {}
    const game = {
      method: 'GET',
      url: `https://api.rawg.io/api/games/${id}?key=004cc6f4ef734a4a8725e3082070efd6`
    }
    axios.request(game).then(function(res) {
      AppState.followedGames.push(res.data)
    }).catch(function(error) {
      logger.error(error)
    })
  }

  async deleteTrackedGame(gameId) {
    await accountService.getTrackedGames(AppState.profile.id)
    const trackedGames = AppState.trackedGames
    const foundGame = trackedGames.find(f => f.gameId === gameId)
    const res = await api.delete(`api/trackedgames/${foundGame.id}`)
    logger.log('deleteTrackedGame', res)
    AppState.trackedGames = AppState.trackedGames.filter(t => t.id !== foundGame.id)
    await this.getTrackedGamesByGameId(gameId)
    this.checkTracked()
  }

  async getTrackedGamesByGameId(gameId) {
    AppState.gameFollowers = []
    const res = await api.get(`api/trackedgames/followers/${gameId}`)
    AppState.gameFollowers = res.data
    logger.log('trackedgamesbyID', AppState.gameFollowers)
  }

  async checkTracked() {
    AppState.gameFollowCheck = false
    const gameFollowers = AppState.gameFollowers
    const accountId = AppState.account.id
    for (let i = 0; i < gameFollowers.length; i++) {
      const follower = gameFollowers[i]
      if (follower.accountId === accountId) {
        AppState.gameFollowCheck = true
      } else {
        AppState.gameFollowCheck = false
      }
    }
  }
}

export const trackedGamesService = new TrackedGamesService()
