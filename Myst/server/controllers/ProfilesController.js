import { Auth0Provider } from '@bcwdev/auth0provider'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger.js'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/posts', this.getPosts)
      .get('/:id/followers', this.getFollowers)
      .get('/:id/following', this.getFollowing)
      .get('/:id/trackedgames', this.getTrackedGames)
      .post('/:id/follow', this.followGamer)
      .delete('/:id/posts/:postId/', this.deletePost)
      .delete('/:id/unfollow', this.unfollowGamer)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getPosts(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const posts = await profileService.getPosts(req.body.creatorId)
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
      req.body.followerId = req.userInfo.id
      const followers = await profileService.getFollowers(req.body.followerId)
      res.send(followers)
    } catch (error) {
      next(error)
      logger.error('getting followers bad', error)
    }
  }

  async getTrackedGames(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const trackedGames = await profileService.getTrackedGames(req.body)
      res.send(trackedGames)
    } catch (error) {
      next(error)
      logger.error('error getting tracked games', error)
    }
  }

  async getFollowing(req, res, next) {
    try {
      req.body.followerId = req.userInfo.id
      req.body.followingId = req.params.id
      const following = await profileService.getFollowing(req.body.followingId)
      res.send(following)
    } catch (error) {
      next(error)
      logger.error('error getting following')
    }
  }

  async followGamer(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.followerId = req.userInfo.id
      req.body.followingId = req.params.id
      const gamer = await profileService.followGamer(req.body)
      res.send(gamer)
    } catch (error) {
      next(error)
      logger.error('error following gamer')
    }
  }

  async unfollowGamer(req, res, next) {
    try {
      req.body.following = req.params.id
      const gamer = await profileService.unFollowGamer(req.body)
      res.send(gamer)
    } catch (error) {
      next(error)
      logger.error('error unfollowing gamer')
    }
  }
}
