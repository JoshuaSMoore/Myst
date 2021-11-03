import axios from 'axios'
import { AppState } from '../AppState'
import { Game } from '../models/Games'
import { router } from '../router'
import { logger } from '../utils/Logger'

// const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://api.rawg.io/api/games?key=24eec9d2cf3a43a49627ed6e8e5c78c0'

}

class GamesSearchService {
  async getGames() {
    await axios.request(options).then(function(res) {
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
      url: `https://api.rawg.io/api/games?key=24eec9d2cf3a43a49627ed6e8e5c78c0&page=${page}&search=${query}&search_precise=true`
    }
    await axios.request(searchGames).then(function(res) {
      AppState.next = res.data.next
      AppState.previous = res.data.previous
      const unsortedGames = res.data.results.map(g => new Game(g))
      AppState.games = unsortedGames.sort((a, b) => b.rating - a.rating)
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
      url: `https://api.rawg.io/api/games?key=24eec9d2cf3a43a49627ed6e8e5c78c0&page=${AppState.currentPage}&search=${AppState.currentSearch}`
    }
    await axios.request(oldGame).then(function(res) {
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
      url: `https://api.rawg.io/api/games?key=24eec9d2cf3a43a49627ed6e8e5c78c0&page=${AppState.currentPage}&search=${AppState.currentSearch}`
    }
    await axios.request(newGame).then(function(res) {
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
      url: `https://api.rawg.io/api/games/${id}?key=24eec9d2cf3a43a49627ed6e8e5c78c0`
    }
    await axios.request(game).then(function(res) {
      AppState.game = res.data

      AppState.gameName = res.data.slug
    }).catch(function(error) {
      logger.error(error)
    })
    this.getRelatedGames(AppState.game.genres[0].slug)
    this.getGameScreenshots(AppState.gameName)
  }

  async getGameScreenshots(gameName) {
    AppState.gameScreenShots = {}
    const screenshots = {
      method: 'GET',
      url: `https://api.rawg.io/api/games/${gameName}/screenshots?key=24eec9d2cf3a43a49627ed6e8e5c78c0`
    }
    await axios.request(screenshots).then(function(res) {
      AppState.gameScreenShots = res.data.results
    }).catch(function(error) {
      logger.error(error)
    })
  }

  async getRelatedGames(genreName) {
    AppState.relatedGames = []
    const relatedGames = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?key=24eec9d2cf3a43a49627ed6e8e5c78c0&genres=${genreName}&page=1&page_size=5`
    }
    await axios.request(relatedGames).then(function(res) {
      AppState.relatedGames = res.data.results
    }).catch(function(error) {
      logger.error(error)
    })
  }
}
export const gamesSearchService = new GamesSearchService()
