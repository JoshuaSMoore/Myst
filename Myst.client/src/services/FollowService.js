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
}

export const followService = new FollowService()
