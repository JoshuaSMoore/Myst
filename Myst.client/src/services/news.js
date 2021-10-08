const axios = require('axios').default

const options = {
  method: 'GET',
  url: 'https://mmo-games.p.rapidapi.com/latestnews',
  headers: {
    'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
    'x-rapidapi-key': '1cbf381c85msh2ea0ee7bd78a7e6p1bbb8fjsn5db7d3da7e8b'
  }
}

axios.request(options).then(function(response) {
  console.log(response.data)
}).catch(function(error) {
  console.error(error)
})
