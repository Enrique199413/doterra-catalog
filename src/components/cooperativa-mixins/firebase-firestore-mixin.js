import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js'
import { FirebaseMixin } from './firebase-mixin'

require('firebase/firestore')

let firebaseFirestoreMixin = (superClass) => class extends FirebaseMixin(superClass) {
  constructor () {
    super()
    this._initFirestoreMixin()
  }

  static get properties () {
    return {}
  }

  _initFirestoreMixin () {
    this.cooperativaDatabase = this.firebase.firestore()
    this.cooperativaDatabase.settings({
      timestampsInSnapshots: true
    })
  }

  async collectionActions (verb, collection, data) {
    return await this.cooperativaDatabase.collection(collection)[verb](data)
  }

}

export const FirebaseFirestoreMixin = dedupingMixin(firebaseFirestoreMixin)
