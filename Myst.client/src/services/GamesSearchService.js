import axios from 'axios'
import { AppState } from '../AppState'
import { Game } from '../models/Games'
import { router } from '../router'
import { logger } from '../utils/Logger'

// const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://api.rawg.io/api/games?key=004cc6f4ef734a4a8725e3082070efd6'

}

class GamesSearchService {
  async getGames() {
    axios.request(options).then(function(res) {
      logger.log(res.data.results)
      AppState.games = res.data.results.map(g => new Game(g))
    }).catch(function(error) {
      logger.error(error)
    })
  }

  async getGamesSearched(query, page = 1) {
    AppState.searchedAccounts = []
    AppState.currentSearch = query
    AppState.currentPage = 1
    const searchGames = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?key=004cc6f4ef734a4a8725e3082070efd6&page=${page}&search=${query}&search_precise=true`
    }
    axios.request(searchGames).then(function(res) {
      logger.log(res.data.results)

      logger.log(res.data)
      AppState.next = res.data.next
      AppState.previous = res.data.previous
      const unsortedGames = res.data.results.map(g => new Game(g))
      AppState.games = unsortedGames.sort((a, b) => b.rating - a.rating)
      logger.log('sorted games', AppState.games)
    }).catch(function(error) {
      logger.error(error)
    })
    router.push({ name: 'Search' })
  }

  async getOld() {
    AppState.currentPage--
    AppState.games = []
    const oldGame = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?key=004cc6f4ef734a4a8725e3082070efd6&page=${AppState.currentPage}&search=${AppState.currentSearch}`
    }
    axios.request(oldGame).then(function(res) {
      AppState.page = res.data
      AppState.next = res.data.next
      AppState.previous = res.data.previous
      AppState.games = res.data.results.map(g => new Game(g))
    }).catch(function(error) {
      logger.error(error)
    })
  }

  async getNew() {
    AppState.games = []
    AppState.currentPage++
    const newGame = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?key=004cc6f4ef734a4a8725e3082070efd6&page=${AppState.currentPage}&search=${AppState.currentSearch}`
    }
    axios.request(newGame).then(function(res) {
      AppState.page = res.data
      AppState.next = res.data.next
      AppState.previous = res.data.previous
      AppState.games = res.data.results.map(g => new Game(g))
    }).catch(function(error) {
      logger.error(error)
    })
  }

  async getGameById(id) {
    AppState.game = {}
    const game = {
      method: 'GET',
      url: `https://api.rawg.io/api/games/${id}?key=004cc6f4ef734a4a8725e3082070efd6`
    }
    axios.request(game).then(function(res) {
      logger.log(res.data)
      AppState.game = res.data
      logger.log('after getById', AppState.game)
    }).catch(function(error) {
      logger.error(error)
    })
  }
}
export const gamesSearchService = new GamesSearchService()
