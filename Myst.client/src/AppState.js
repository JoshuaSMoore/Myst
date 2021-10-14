import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  searchedAccounts: [],
  profile: {},
  currentPage: 1,
  previous: '',
  next: '',
  page: {},
  news: [],
  games: [],
  game: {},
  posts: [],
  usersPosts: [],
  trackedGames: [],
  followedGames: [],
  printing: false,
  following: []
})
