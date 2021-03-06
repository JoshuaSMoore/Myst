import { AppState } from '../AppState'
import { deleteObject } from 'firebase/storage'
import { fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class FirebaseService {
  async upload(data, type, body) {
    const collection = storage.ref(type)
    const resource = collection.child(data.name + Math.random(Math.floor() * 5000))
    // const resource = collection.child(AppState.account.id).child(data.name)
    const snapshot = await resource.put(data, {
      customMetadata: {
        uid: AppState.account.id, size: data.size, type: data.type
      }
    })
    const url = await snapshot.ref.getDownloadURL()
    return url
  }

  async uploadBase64(base64, name, path = 'Thumbs') {
    const collection = storage.ref(path)
    const resource = collection.child(name + Math.floor(Math.random() * 10000) + '.jpg')
    const snapshot = await resource.putString(base64, 'data_url', {
      customMetadata: {
        uid: AppState.account.id
      }
    })
    const url = await snapshot.ref.getDownloadURL()
    return url
  }

  async remove(mediaUrl, body) {
    const typeIndex = mediaUrl.indexOf('spot.com/o/')
    const type = mediaUrl.slice(typeIndex + 11, typeIndex + 17)
    const fileName = mediaUrl.slice(mediaUrl.indexOf('%2F') + 3, mediaUrl.indexOf('?alt'))

    const collection = storage.ref(type) // access sub folder in firebase (images or videos)
    const resource = collection.child(fileName) // this needs to be the name of the file
    await resource.delete()
  }

  async login() {
    try {
      const res = await api.get('/account/firebase-token')
      const firebaseAuthToken = res.data.token
      await fbAuth.signInWithCustomToken(firebaseAuthToken)
    } catch (e) {
      logger.error('[FIREBASE_AUTH] unable to authenticate', e)
    }
  }
}

export const firebaseService = new FirebaseService()
