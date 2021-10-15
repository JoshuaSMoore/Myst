import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  searchedAccounts: [],
  comments: [],
  profile: {},
  currentPage: 1,
  previous: '',
  next: '',
  page: {},
  news: [],
  games: [],
  game: {},
  gameScreenShots: [],
  gameName: '',
  posts: [],
  post: '',
  usersPosts: [],
  trackedGames: [],
  followedGames: [],
  printing: false,
  following: [],
  gameFollowers: [],
  gameFollowCheck: false,
  yourFavoriteGames: []
})
