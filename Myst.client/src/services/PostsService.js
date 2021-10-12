import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { Post } from '../models/Post'
import Pop from '../utils/Pop'

class PostsService {
  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    logger.log('Post was made', res.data)
    AppState.usersPosts.unshift(new Post(res.data))
  }

  async getPostByProfileId(profileId) {
    AppState.usersPosts = []
    try {
      const res = await api.get(`api/profiles/${profileId}/posts`)
      logger.log('your data for posts related to this profile', res.data)
      AppState.usersPosts = res.data
      logger.log(AppState.usersPosts)
    } catch (error) {
      Pop.toast(error.message, error)
    }
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    logger.log('your deleted post', res.data)
    AppState.posts = AppState.posts.filter(p => p.id !== postId)
  }
}

export const postsService = new PostsService()
