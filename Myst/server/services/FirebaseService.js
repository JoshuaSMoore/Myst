import firebaseAdmin from 'firebase-admin'

const firebaseAccountKey = require('../../firebase.env.json')

class FirebaseService {
  constructor() {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseAccountKey)
    })
  }

  async getFirebaseAuthToken(user) {
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(user.id)
    return firebaseToken
  }
}

export const firebaseservice = new FirebaseService()
