import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { router } from '../router'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
      AppState.profile = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAccountById(id) {
    try {
      const res = await api.get(`account/${id}`)

      AppState.otherUser = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editProfile(editable) {
    const res = await api.put('account', editable)

    AppState.account = res.data
    AppState.profile = res.data
  }

  async getTrackedGames(profileId) {
    AppState.trackedGames = []
    const res = await api.get(`api/profiles/${profileId}/trackedgames`)

    AppState.trackedGames = res.data
  }

  async getProfileGames(profileId) {
    AppState.trackedGames = []
    const res = await api.get(`api/profiles/${profileId}/trackedgames`)

    AppState.profileGames = res.data
  }

  async searchAccounts(query) {
    AppState.games = []
    const res = await api.get(`account/search/?name=${query}`)
    AppState.searchedAccounts = res.data

    router.push({ name: 'Search' })
  }
}

export const accountService = new AccountService()
