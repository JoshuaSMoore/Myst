import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class TrackedGamesService {
  async createTrackedGame(trackedGameData, oldTracked, accountId) {
    for (let i = 0; i < oldTracked.length; i++) {
      const check = oldTracked[i]
      if (check.accountId.toString() === accountId) {
        throw new BadRequest('You are already tracking this game')
      }
    }
    const trackedGame = await dbContext.TrackedGame.create(trackedGameData)
    await trackedGame.populate('game')
    await trackedGame.populate('tracker')
    return trackedGame
  }

  async getTrackedGameById(trackedGameId) {
    const trackedGame = await dbContext.TrackedGame.findById(trackedGameId).populate('game')
    await trackedGame.populate('tracker')
    if (!trackedGame) {
      throw new BadRequest('Invalid Id or this game does not exist in your library')
    }
    return trackedGame
  }

  async favoriteTrackedGame(trackedGameId) {
    const favoritedGame = await dbContext.TrackedGame.findOneAndUpdate(trackedGameId)
    return favoritedGame
  }

  async deleteTrackedGame(trackedGameId) {
    const deletedGame = await dbContext.TrackedGame.findByIdAndDelete(trackedGameId)
    return deletedGame
  }
}

export const trackedGamesService = new TrackedGamesService()
