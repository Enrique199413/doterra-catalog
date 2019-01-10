import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js'
import { FirebaseMixin } from './firebase-mixin'
import ReduxMixin from './redux-mixin'
import { bindActionCreators } from 'polymer-redux'

require('firebase/auth')

//TODO try to remove ReduxMixin on class, for conserve pure polymer
let firebaseAuthMixin = (superClass) => class extends ReduxMixin(FirebaseMixin(superClass)) {
  constructor () {
    super()
    this._verifyConnection()
    this._verifyUserExist()
    this.getProviders()
  }

  static get properties () {
    return {
      facebookConfiguration: {
        type: String,
        value: {
          'display': 'popup'
        }
      },
      providers: {
        type: Object,
        value: {}
      }
    }
  }

  _verifyConnection () {
    if (!this.initializeApp.options) {
      throw new Error('FirebaseAuthMixin: Verify credentials on Firebase')
    }

    this.firebase.auth().setPersistence(this.firebase.auth.Auth.Persistence.LOCAL)
      .then(data => {})
  }

  _verifyUserExist () {
    this.firebase.auth().onAuthStateChanged(user => {
      this.dispatchEvent(
        new CustomEvent('set-user', {
          detail: user === null ? {} : user,
          bubbles: true,
          composed: true
        })
      )
    })
  }

  getProviders () {
    this.providers.facebookProvider = new this.firebase.auth.FacebookAuthProvider()
    this.providers.googleProvider = new this.firebase.auth.GoogleAuthProvider()
    this.providers.facebookProvider.setCustomParameters(this.facebookConfiguration)
  }

  async authAuthenticateWithProvider (provider) {
    return await this.firebase.auth().signInWithPopup(provider)
  }

  async destroySession () {
    return await this.firebase.auth().signOut()
  }
}

export const FirebaseAuthMixin = dedupingMixin(firebaseAuthMixin)
