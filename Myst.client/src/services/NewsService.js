import axios from 'axios'
import { AppState } from '../AppState'
import { News } from '../models/NewsCard'
import { logger } from '../utils/Logger'

const apiKey = '1cbf381c85msh2ea0ee7bd78a7e6p1bbb8fjsn5db7d3da7e8b'
const newsApi = axios.create({
  baseURL: 'https://mmo-games.p.rapidapi.com/latestnews'
})

class NewsService {
  async getNews() {
    const res = await newsApi.get(`?rapidapi-key=${apiKey}`)
    logger.log('the res', res)
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
    AppState.news = res.data.results.map(n => new News(n))
  }
}
export const newsService = new NewsService()
