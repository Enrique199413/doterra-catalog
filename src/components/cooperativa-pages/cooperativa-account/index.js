import { PolymerElement, html } from '@polymer/polymer/polymer-element'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-styles/paper-styles'
import '@polymer/app-route/app-location'
import '@polymer/app-route/app-route'

import template from './template.html'
import css from './style.pcss'
import { FirebaseAuthMixin } from '../../cooperativa-mixins/firebase-auth-mixin'

import ReduxMixin from '../../cooperativa-mixins/redux-mixin'
import { bindActionCreators } from 'polymer-redux'

export default class CooperativaAcount extends ReduxMixin(FirebaseAuthMixin(PolymerElement)) {
  static get properties () {
    return {
      user: {
        type: Object,
        value: {}
      }
    }
  }

  //TODO perform that code and re-write more simple
  static mapStateToProps (state, element) {
    return {
      user: state.userReducer.user
    }
  }

  //TODO perform that code and re-write more simple
  static mapDispatchToEvents (dispatch, element) {
    return bindActionCreators(
      {
        setUser (event) {
          return {
            type: 'SET_USER',
            user: event.detail
          }
        }
      },
      dispatch
    )
  }

  _getDate (date) {
    return new Date(date)
  }

  closeSession () {
    this.destroySession().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    })
  }

  static get template () {
    return html([`<style is="custom-style" include="paper-material-styles iron-flex iron-flex-alignment cooperativa-shared-styles">${css}</style>${template}`])
  }

  constructor () {
    super()
  }
}

window.customElements.define('cooperativa-account', CooperativaAcount)
