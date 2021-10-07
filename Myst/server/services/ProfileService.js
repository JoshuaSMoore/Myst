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

  async deletePost(postId, userId) {
    const post = await this.getPosts(postId)
    if (userId !== post[0].creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    await post[0].remove()
    return post
  }

  async getFollowers(followerId) {
    const followers = await dbContext.Follow.find({ followerId }).populate('follower').populate('following')
    return followers
  }

  async getFollowing(followingId) {
    const following = await dbContext.Follow.find({ followingId }).populate('follower').populate('following')
    return following
  }

  async getFollowerById(followerId) {
    const follower = await dbContext.Follow.findById(followerId).populate('creator', 'name picture')
    if (!follower) {
      throw new BadRequest('unable to find')
    }
    return follower
  }

  async followGamer(followData) {
    const follow = await dbContext.Follow.create(followData)
    await follow.populate('follower').populate('following')
    return follow
  }

  async unFollowGamer(followerId, userId) {
    const follower = await this.getFollowerById(followerId)
    if (follower.creatorId.toString() !== userId) {
      throw new Forbidden('BAD BAD BAD BAD')
    }
    await follower.remove()
    return follower
  }

  async getTrackedGames(accountId) {
    const trackedGames = await dbContext.TrackedGame.find(accountId).populate('tracker').populate('game')
    return trackedGames
  }
}
export const profileService = new ProfileService()
