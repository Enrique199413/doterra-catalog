import { PolymerElement, html } from '@polymer/polymer/polymer-element'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-input/paper-input'
import '@polymer/iron-icons/iron-icons'
import '@polymer/iron-icons/social-icons'
import '@polymer/paper-menu-button/paper-menu-button'
import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-styles/paper-styles'
import '@polymer/paper-styles/typography'
import '@polymer/app-route/app-location'
import '@polymer/app-route/app-route'
import '@polymer/paper-card/paper-card'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-item/paper-item'
import '@polymer/iron-flex-layout/iron-flex-layout-classes'
import '../cooperativa-pages/cooperativa-login'
import '../cooperativa-pages/cooperativa-account'
import 'web-animations-js/web-animations-next-lite.min'

import css from './style.pcss'
import cssShared from '../cooperativa-shared-style/cooperativa-shared-style.pcss'

import template from './template.html'

import ReduxMixin from '../cooperativa-mixins/redux-mixin'
import { bindActionCreators } from 'polymer-redux'

require('../cooperativa-redux/cooperativa-store')

export default class CooperativaLayout extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      user: {
        type: Object,
        observer: '_verifyUserExists'
      },
      loading: {
        type: Boolean,
        value: true
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

  static get template () {
    return html([`<style is="cooperativa-shared-styles">${cssShared}</style><style is="custom-style" include="paper-material-styles iron-flex iron-flex-alignment">${css}</style>${template}`])
  }

  _verifyUserExists (userInformation = undefined) {
    this.userExist = Object.keys(userInformation).length > 0
    if (!this.userExist) {
      this.cooperativaRoute.cooperativaRouteSelection = 'login'
      this.notifyPath('cooperativaRoute.cooperativaRouteSelection', 'login')
    } else {
      this.cooperativaRoute.cooperativaRouteSelection = 'account'
      this.notifyPath('cooperativaRoute.cooperativaRouteSelection', 'account')
    }
  }

  constructor () {
    super()
  }
}

window.customElements.define('cooperativa-layout', CooperativaLayout)
