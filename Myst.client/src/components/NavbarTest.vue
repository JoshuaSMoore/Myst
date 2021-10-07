<template>
  <nav class="navbar navbar-dark bg-dark fixed-top text-light">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <img
            alt="logo"
            src="../assets/img/myst-logo.png"
            height="45"
          />
        </div>
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
      <div class="offcanvas offcanvas-end bg-dark text-light" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            MYST
          </h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable selectable bg-dark text-secondary">
                Manage Account
              </div>
            </router-link>
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
            <router-link :to="{ name: 'Profile' }">
              <div class="list-group-item list-group-item-action hoverable selectable bg-dark text-secondary">
                Profile
              </div>
            </router-link>
            <router-link :to="{ name: 'Game' }">
              <div class="list-group-item list-group-item-action hoverable selectable bg-dark text-secondary">
                Game
              </div>
            </router-link>
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
import { computed } from 'vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
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

</style>
