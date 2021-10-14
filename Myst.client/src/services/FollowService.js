import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class FollowService {
  async addFollower(id) {
    const res = await api.post(`api/profiles/${id}/follow`)
    logger.log(res)
  }

  async getFollowing(id) {
    AppState.following = []
    const res = await api.get(`api/profiles/${id}/following`)
    AppState.following = res.data
    logger.log('JKDLFLKS:DJJFLJ:DSLKF:SD', AppState.following)
  }

  async deleteFollower(otherUserId) {
    const following = AppState.following
    const foundFollowing = following.find(f => f.followingId === otherUserId)
    const res = await api.delete(`api/profiles/${otherUserId}/unfollow/${foundFollowing.id}`)
    logger.log('deleteFollower', res)
    AppState.following = AppState.following.filter(f => f.id !== foundFollowing.id)
  }
}

export const followService = new FollowService()
