export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'jmoore07.us.auth0.com'
export const clientId = 'mm6F2SzDZrPMB9IipadiK2od6OXoO2NX'
export const audience = 'https://studentauth.co'

export const firebaseConfig = {
  apiKey: 'AIzaSyBzDndRYYFiLu619zZVcPRX4nFn4LAqg18',
  authDomain: 'myst-547a1.firebaseapp.com',
  projectId: 'myst-547a1',
  storageBucket: 'myst-547a1.appspot.com',
  messagingSenderId: '341128621647',
  appId: '1:341128621647:web:d7e47d252813c63f32443a',
  measurementId: 'G-Z74ES3NCH1'
}
