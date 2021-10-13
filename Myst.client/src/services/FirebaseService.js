import { AppState } from '../AppState'
import { deleteObject } from 'firebase/storage'
import { fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class FirebaseService {
  async upload(data, type) {
    const collection = storage.ref(type)
    const resource = collection.child(data.name)
    // const resource = collection.child(AppState.account.id).child(data.name)
    const snapshot = await resource.put(data, {
      customMetadata: {
        uid: AppState.account.id, size: data.size, type: data.type
      }
    })
    const url = await snapshot.ref.getDownloadURL()
    return url
  }

  async remove(mediaUrl) {
    const typeIndex = mediaUrl.indexOf('spot.com/o/')
    const type = mediaUrl.slice(typeIndex + 11, typeIndex + 17)
    const fileName = mediaUrl.slice(mediaUrl.indexOf('%2F') + 3, mediaUrl.indexOf('?alt'))
    logger.log('removing this ', type, fileName)
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
