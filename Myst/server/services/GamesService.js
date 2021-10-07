import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class GamesService {
  // async createGame(data) {
  //   const game = await dbContext.Games.create(data)
  //   return game
  // }

  async getGames(query) {
    const games = await dbContext.Game.find(query)
    return games
  }

  async getGamesById(gameId) {
    const game = await dbContext.Game.findById(gameId).populate('genre')
    if (!game) {
      throw BadRequest('☠ invalid gameId from server gamesService')
    }
    return game
  }

  async getTrackedGames(gameId) {
    const trackedGames = await dbContext.TrackedGames.find({ gameId }).populate('bug').populate('tracker')
    return trackedGames
  }
}

export const gamesService = new GamesService()
