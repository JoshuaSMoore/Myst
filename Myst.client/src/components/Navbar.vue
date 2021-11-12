<template>
  <nav class="navbar header navbar-dark fixed-top text-light mx-2">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center mt-2">
          <img alt="logo" src="../assets/img/mystlight.png" height="45" />
        </div>
      </router-link>

      <div class="justify-content-flex-end d-flex">
        <!-- NOTE magnify -->
        <div class="container-fluid d-flex">
          <button
            class="navbarFog"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            title="Search Games and Users"
            aria-label="Toggle search"
          >
            <i class="mdi mdi-magnify text-light f-20"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <form @submit.prevent="searchGames(query)" v-if="searchToggle">
              <div class="input-group p-2 d-flex justify-content-end">
                <input
                  v-model="query"
                  type="text"
                  class="form-control bg-success text-dark d-flex"
                  placeholder="Search Game"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-primary bg-dark"
                  type="submit"
                  id="button-addon2"
                >
                  Search Game
                </button>
                <button
                  v-if="searchToggle"
                  class="btn btn-info ms-2"
                  @click="searchToggle = false"
                >
                  Switch to Users
                </button>
              </div>
            </form>
            <form @submit.prevent="searchAccounts(query)" v-else>
              <div class="input-group p-2 d-flex justify-content-end">
                <input
                  v-model="query"
                  type="text"
                  class="form-control bg-info text-dark d-flex"
                  placeholder="Search User"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  id="button-addon2"
                >
                  Search User
                </button>
                <button
                  class="btn btn-success ms-2"
                  @click="searchToggle = true"
                >
                  Switch to Games
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- NOTE Login -->
        <router-link
          class="navbar-brand d-flex p-2 ms-3"
          :to="{ name: 'Profile', params: { profileId: account.id } }"
        >
          <i class="mdi mdi-account-outline f-20" title="Profile"></i>
        </router-link>
        <button
          class="
            btn
            selectable
            text-success
            lighten-30
            text-uppercase
            my-2 my-lg-0
          "
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <button
          class="navbarFog"
          v-else
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i class="mdi mdi-menu f-20 text-light" title="Menu"></i>
        </button>
      </div>

      <div
        class="offcanvas offcanvas-end bg-dark text-light"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            MYST
          </h5>
          <button
            type="button"
            class="btn btn-outline-primary"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i class="mdi mdi-close text-light"></i>
          </button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <form @submit.prevent="searchGames(query)" v-if="searchToggle">
              <div class="input-group p-2 d-flex justify-content-end">
                <input
                  v-model="query"
                  type="text"
                  class="form-control bg-success text-dark d-flex"
                  placeholder="Search Game"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-primary bg-dark"
                  type="submit"
                  id="button-addon2"
                >
                  Search Game
                </button>
              </div>
            </form>
            <form @submit.prevent="searchAccounts(query)" v-else>
              <div class="input-group p-2 d-flex justify-content-end">
                <input
                  v-model="query"
                  type="text"
                  class="form-control bg-info text-dark d-flex"
                  placeholder="Search User"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  id="button-addon2"
                >
                  Search User
                </button>
              </div>
            </form>
            <div class="p-2 align-center">
              <button
                v-if="searchToggle"
                class="btn btn-info"
                @click="searchToggle = false"
              >
                Search Users
              </button>
              <button
                v-else
                class="btn btn-success"
                @click="searchToggle = true"
              >
                Search Games
              </button>
            </div>
            <router-link :to="{ name: 'About' }">
              <div
                class="
                  list-group-item list-group-item-action
                  hoverable
                  selectable
                  bg-dark
                  text-secondary
                "
              >
                About
              </div>
            </router-link>
            <router-link :to="{ name: 'Search' }">
              <div
                class="
                  list-group-item list-group-item-action
                  hoverable
                  selectable
                  bg-dark
                  text-secondary
                "
              >
                Search
              </div>
            </router-link>
            <router-link
              :to="{ name: 'Profile', params: { profileId: profile.id } }"
            >
              <div
                class="
                  list-group-item list-group-item-action
                  hoverable
                  selectable
                  bg-dark
                  text-secondary
                "
              >
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
                class="
                  list-group-item list-group-item-action
                  hoverable
                  bg-dark
                  selectable
                  text-danger
                "
                @click="logout"
              >
                <i class="mdi mdi-logout"></i>
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
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white;
}

.navbar {
  padding: 0;
}
.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}
.navbar li {
  position: relative;
}
.navbar > ul > li {
  white-space: nowrap;
  padding: 10px 0 10px 30px;
}
.navbar a,
.navbar a:focus {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 0;
  white-space: nowrap;
  transition: 0.3s;
  letter-spacing: 0.4px;
  position: relative;
  text-transform: uppercase;
}
.navbar a i,
.navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
}
.navbar > ul > li > a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -6px;
  left: 0;
  width: 0;
  background-color: #fff;
  visibility: hidden;
  transition: all 0.3s ease-in-out 0s;
}
.navbar a:hover:before,
.navbar li:hover > a:before,
.navbar .active:before {
  visibility: visible;
  width: 80%;
}
.navbar a:hover,
.navbar .active,
.navbar .active:focus,
.navbar li:hover > a {
  color: #fff;
}
.navbar .dropdown ul {
  display: block;
  position: absolute;
  left: 30px;
  top: calc(100% + 30px);
  margin: 0;
  padding: 10px 0;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
  transition: 0.3s;
}
.navbar .dropdown ul li {
  min-width: 200px;
}
.navbar .dropdown ul a {
  padding: 10px 20px;
  font-size: 14px;
  text-transform: none;
  color: #4e4e4e;
}
.navbar .dropdown ul a i {
  font-size: 12px;
}
.navbar .dropdown ul a:hover,
.navbar .dropdown ul .active:hover,
.navbar .dropdown ul li:hover > a {
  color: #004872;
}
.navbar .dropdown:hover > ul {
  opacity: 1;
  top: 100%;
  visibility: visible;
}
.navbar .dropdown .dropdown ul {
  top: 0;
  left: calc(100% - 30px);
  visibility: hidden;
}
.navbar .dropdown .dropdown:hover > ul {
  opacity: 1;
  top: 0;
  left: 100%;
  visibility: visible;
}
@media (max-width: 1366px) {
  .navbar .dropdown .dropdown ul {
    left: -90%;
  }
  .navbar .dropdown .dropdown:hover > ul {
    left: -100%;
  }
}

/**
* Mobile Navigation
*/
.mobile-nav-toggle {
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  display: none;
  line-height: 0;
  transition: 0.5s;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }

  .navbar ul {
    display: none;
  }
}
.navbar-mobile {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(78, 78, 78, 0.9);
  transition: 0.3s;
  z-index: 999;
}
.navbar-mobile .mobile-nav-toggle {
  position: absolute;
  top: 15px;
  right: 15px;
}
.navbar-mobile ul {
  display: block;
  position: absolute;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  padding: 10px 0;
  background-color: #fff;
  overflow-y: auto;
  transition: 0.3s;
}
.navbar-mobile > ul > li {
  padding: 0;
}
.navbar-mobile a:hover:before,
.navbar-mobile li:hover > a:before,
.navbar-mobile .active:before {
  visibility: hidden;
}
.navbar-mobile a,
.navbar-mobile a:focus {
  padding: 10px 20px;
  font-size: 15px;
  color: #4e4e4e;
}
.navbar-mobile a:hover,
.navbar-mobile .active,
.navbar-mobile li:hover > a {
  color: #004872;
}
.navbar-mobile .getstarted,
.navbar-mobile .getstarted:focus {
  margin: 15px;
}
.navbar-mobile .dropdown ul {
  position: static;
  display: none;
  margin: 10px 20px;
  padding: 10px 0;
  z-index: 99;
  opacity: 1;
  visibility: visible;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
}
.navbar-mobile .dropdown ul li {
  min-width: 200px;
}
.navbar-mobile .dropdown ul a {
  padding: 10px 20px;
}
.navbar-mobile .dropdown ul a i {
  font-size: 12px;
}
.navbar-mobile .dropdown ul a:hover,
.navbar-mobile .dropdown ul .active:hover,
.navbar-mobile .dropdown ul li:hover > a {
  color: #004872;
}
.navbar-mobile .dropdown > .dropdown-active {
  display: block;
}

.navbarFog {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .navbarFog {
    transition: none;
  }
}
.navbarFog:hover {
  text-decoration: none;
}
.navbarFog:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: 0 0 0 0.25rem;
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
