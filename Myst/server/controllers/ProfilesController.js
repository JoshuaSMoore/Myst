import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:id/posts', this.getPosts)
      .get('/:id/followers', this.getFollowers)
      .get('/:id/following', this.getFollowing)
      .get('/:id/trackedgames', this.getTrackedGames)
      .post('/:id/follow', this.followGamer)
      .delete('/:id/posts/:postId/', this.deletePost)
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
}
