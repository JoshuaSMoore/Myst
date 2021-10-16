import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: authSettled
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/game/:gameId',
    name: 'Game',
    component: loadPage('GamePage'),
    beforeEnter: authGuard
  },
  {
    path: '/account/:profileId',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authGuard
  },
  {
    path: '/profile/:otheruserId',
    name: 'OtherUserPage',
    component: loadPage('OtherUserPage'),
    beforeEnter: authGuard
  },
  {
    path: '/search',
    name: 'Search',
    component: loadPage('SearchPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
