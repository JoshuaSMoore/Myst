import { dbContext } from '../db/DbContext.js'
import { logger } from '../utils/Logger.js'

// IMPORTANT profiles should not be updated or modified in any way here. Use the AccountService

class ProfileService {
  /**
    * Returns a user profile from its id
    * @param {string} id
   */
  async getProfileById(id) {
    const profile = await dbContext.Profiles.findById(id)
    return profile
  }

  /**
    * Returns a list user profiles from a query search of name likeness
    * limits to first 20 without offset
    * @param {string} name
   */
  async findProfiles(name = '', offset = 0) {
    const filter = new RegExp(name, 'ig')
    return await dbContext.Profiles
      .aggregate([{
        $match: { name: filter }
      }])
      .collation({ locale: 'en_US', strength: 1 })
      .skip(Number(offset))
      .limit(20)
      .exec()
  }

  async getPosts(req, res, next) {
    try {
      const posts = await profileService.getPosts(req.query)
      res.send(posts)
    } catch (error) {
      next(error)
      logger.error('get posts error', error)
    }
  }

  async deletePost(req, res, next) {
    try {
      const post = await profileService.deletePost(req.params.postId, req.userInfo.id)
      res.send(post)
    } catch (error) {
      next(error)
      logger.error('delete post by id error', error)
    }
  }

  async getFollowers(req, res, next) {
    try {
      const followers = await profileService.getFollowers(req.query)
      res.send(followers)
    } catch (error) {
      next(error)
      logger.error('getting followers bad', error)
    }
  }

  async getTrackedGames(req, res, next) {
    try {
      const trackedGames = await profileService.getTrackedGames(req.query)
      res.send(trackedGames)
    } catch (error) {
      next(error)
      logger.error('error getting tracked games', error)
    }
  }

  async
}

export const profileService = new ProfileService()
