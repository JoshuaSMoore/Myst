import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class TrackedGamesService {
  async createTrackedGame(oldTracked, accountId, trackedGameData) {
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
    const trackedGame = await dbContext.TrackedGame.findById(trackedGameId)
    await trackedGame.populate('game')
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

  async createTrackedBug(data) {
    const trackedBugs = await dbContext.TrackedGame.find({ gameId: data.gameId }).populate('tracker').populate('game')
    for (let i = 0; i < trackedBugs.length; i++) {
      const check = trackedBugs[i]
      if (check.accountId.toString() === data.accountId) {
        throw new BadRequest('can only track one time')
      }
    }

    const trackBug = await dbContext.TrackedGame.create(data)
    await trackBug.populate('tracker')
    await trackBug.populate('game')
    return trackBug
  }
}

export const trackedGamesService = new TrackedGamesService()
