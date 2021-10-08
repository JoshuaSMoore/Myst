import axios from 'axios'
import { AppState } from '../AppState'
import { News } from '../models/NewsCard'
import { logger } from '../utils/Logger'

// const apiKey = '1cbf381c85msh2ea0ee7bd78a7e6p1bbb8fjsn5db7d3da7e8b'
// const newsApi = axios.create({
//   baseURL: 'https://mmo-games.p.rapidapi.com/latestnews'
// })
// const axios = require('axios').default
const options = {
  method: 'GET',
  url: 'https://mmo-games.p.rapidapi.com/latestnews',
  headers: {
    'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
    'x-rapidapi-key': '1cbf381c85msh2ea0ee7bd78a7e6p1bbb8fjsn5db7d3da7e8b'
  }
}
class NewsService {
  async getNews() {
    axios.request(options).then(function(res) {
      logger.log('the res', res)
      AppState.currentPage = res.data.page
      AppState.totalPages = res.data.total_pages
      AppState.news = res.data
      // AppState.news = res.data.results.map(n => new News(n))
    })
  }
}
export const newsService = new NewsService()
