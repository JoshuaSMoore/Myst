import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class FollowService {
  async addFollower(id) {
    const res = await api.post(`api/profiles/${id}/follow`)

    AppState.following.push(res.data)
  }

  async getFollowing(id) {
    AppState.following = []
    const res = await api.get(`api/profiles/${id}/following`)
    AppState.following = res.data
  }

  async deleteFollower(otherUserId) {
    const following = AppState.following
    const foundFollowing = following.find(f => f.followingId === otherUserId)
    const res = await api.delete(`api/profiles/${otherUserId}/unfollow/${foundFollowing.id}`)
    logger.log(res)
    AppState.following = AppState.following.filter(f => f.id !== foundFollowing.id)
  }

  async checkFollow() {
    const foundFollowing = AppState.following.find(f => f.creatorId === AppState.account.id)
    if (foundFollowing) {
    }
  }
}

export const followService = new FollowService()
