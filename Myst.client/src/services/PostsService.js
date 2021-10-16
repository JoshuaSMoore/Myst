import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { Post } from '../models/Post'
import Pop from '../utils/Pop'

class PostsService {
  async createPost(postData) {
    const res = await api.post('api/posts', postData)

    AppState.usersPosts = AppState.usersPosts.filter(p => p.body !== 'loading')
    AppState.usersPosts.unshift(new Post(res.data))
  }

  async getPostByProfileId(profileId) {
    AppState.usersPosts = []
    try {
      const res = await api.get(`api/profiles/${profileId}/posts`)

      AppState.usersPosts = res.data
    } catch (error) {
      Pop.toast(error.message, error)
    }
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)

    AppState.usersPosts = AppState.usersPosts.filter(p => p.id !== postId)
  }
}

export const postsService = new PostsService()
