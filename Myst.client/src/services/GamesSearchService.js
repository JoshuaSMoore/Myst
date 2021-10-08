import axios from 'axios'
import { AppState } from '../AppState'
import { Game } from '../models/Games'
import { logger } from '../utils/Logger'

// const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://api.rawg.io/api/games?key=004cc6f4ef734a4a8725e3082070efd6'
//   headers: {
//     'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
//     'x-rapidapi-key': '004cc6f4ef734a4a8725e3082070efd6'
//   }
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
}
export const gamesSearchService = new GamesSearchService()
