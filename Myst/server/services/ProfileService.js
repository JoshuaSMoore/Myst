import { ProfilesController } from '../controllers/ProfilesController.js'
import { dbContext } from '../db/DbContext.js'
import { logger } from '../utils/Logger.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

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

  async getPosts(creatorId) {
    const posts = await dbContext.Post.find({ creatorId }).populate('creator', 'name picture')
    return posts
  }

  async getFollowers(followerId) {
    const followers = await dbContext.Follow.find({ followerId }).populate('follower').populate('following')
    return followers
  }

  async getFollowing(accountId) {
    const following = await dbContext.Follow.find({ creatorId: accountId }).populate('follower').populate('following')
    return following
  }

  async getFollowerById(followerId) {
    const follower = await dbContext.Follow.findById(followerId)
    if (!follower) {
      throw new BadRequest('unable to find')
    }
    return follower
  }

  async followGamer(followData, oldFollowing) {
    for (let i = 0; i < oldFollowing.length; i++) {
      const check = oldFollowing[i]
      if (check.followingId.toString() === followData.followingId) {
        throw new BadRequest('can only follow a gamer once')
      }
    }
    const follow = await dbContext.Follow.create(followData)
    await follow.populate('follower')
    await follow.populate('following')
    return follow
  }

  async unFollowGamer(unfollowId, userId) {
    const follow = await this.getFollowerById(unfollowId)
    if (follow.creatorId.toString() === userId) {
      await follow.remove()
    } else {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
  }

  async getTrackedGames(accountId) {
    const trackedGames = await dbContext.TrackedGame.find({ accountId }).populate('tracker')
    return trackedGames
  }
}
export const profileService = new ProfileService()
