<template>
  <nav class="navbar navbar-dark bg-dark fixed-top text-light ">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <img
            alt="logo"
            src="../assets/img/mystlight.png"
            height="45"
          />
        </div>
      </router-link>
      <div>
        <button v-if="searchToggle" class="btn btn-info p-1" @click="searchToggle = false">
          Search Users
        </button>
        <button v-else class="btn btn-success p-1" @click="searchToggle = true">
          Search Games
        </button>
      </div>
      <div class="justify-content-flex-end d-flex">
        <form @submit.prevent="searchGames(query)" v-if="searchToggle">
          <div class="input-group mt-1 mb-1 d-flex justify-content-end" style="width: 50vw">
            <input v-model="query"
                   type="text"
                   class="form-control bg-success text-dark d-flex"
                   placeholder="Search Game"

                   aria-label="Search"
                   aria-describedby="button-addon2"
            >
            <button class="btn btn-outline-primary" type="submit" id="button-addon2">
              Search Game
            </button>
          </div>
        </form>
        <form @submit.prevent="searchAccounts(query)" v-else>
          <div class="input-group mt-1 mb-1 d-flex justify-content-end" style="width: 50vw">
            <input v-model="query"
                   type="text"
                   class="form-control bg-info text-dark d-flex"
                   placeholder="Search User"

                   aria-label="Search"
                   aria-describedby="button-addon2"
            >
            <button class="btn btn-outline-primary" type="submit" id="button-addon2">
              Search User
            </button>
          </div>
        </form>
        <router-link class="navbar-brand d-flex p-2 ms-3" :to="{ name: 'Profile', params: {profileId: account.id} }">
          <i class="mdi mdi-account-outline f-20 "></i>
        </router-link>
        <button
          class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <button class="navbar-toggler"
                v-else
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="offcanvas offcanvas-end bg-dark text-light" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            MYST
          </h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <router-link :to="{ name: 'About' }">
              <div class="list-group-item list-group-item-action hoverable selectable bg-dark text-secondary">
                About
              </div>
            </router-link>
            <router-link :to="{ name: 'Search' }">
              <div class="list-group-item list-group-item-action hoverable selectable bg-dark text-secondary">
                Search
              </div>
            </router-link>
            <router-link :to="{ name: 'Profile', params: {profileId: profile.id }}">
              <div class="list-group-item list-group-item-action hoverable selectable bg-dark text-secondary">
                Profile
              </div>
            </router-link>
            <!-- <router-link :to="{ name: 'Game' }">
              <div class="list-group-item list-group-item-action hoverable selectable bg-dark text-secondary">
                Game
              </div>
            </router-link> -->
            <li>
              <div
                class="list-group-item list-group-item-action hoverable bg-dark selectable text-danger"
                @click="logout"
              >
                <i class="mdi mdi-logout "></i>
                logout
              </div>
            </li>
          </ul>
          <!-- <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, ref } from 'vue'
import Pop from '../utils/Pop'
import { gamesSearchService } from '../services/GamesSearchService'
import { accountService } from '../services/AccountService.js'
export default {
  setup() {
    const query = ref('')
    const searchToggle = ref(true)
    return {
      searchToggle,
      query,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      async searchGames() {
        try {
          await gamesSearchService.getGamesSearched(query.value)
        } catch (error) {
          Pop.toast(error, 'Cant find game or invalid search request')
        }
      },

      async searchAccounts() {
        try {
          await accountService.searchAccounts(query.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },

      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: white;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: white;
}
</style>
