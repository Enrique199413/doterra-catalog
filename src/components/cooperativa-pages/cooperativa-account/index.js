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
import {} from '@polymer/polymer/lib/elements/dom-repeat.js'
import '@vaadin/vaadin-grid/vaadin-grid.js'

import template from './template.html'
import css from './style.pcss'
import { FirebaseAuthMixin } from '../../cooperativa-mixins/firebase-auth-mixin'

import ReduxMixin from '../../cooperativa-mixins/redux-mixin'
import { bindActionCreators } from 'polymer-redux'
import { FirebaseFirestoreMixin } from '../../cooperativa-mixins/firebase-firestore-mixin'

export default class CooperativaAcount extends ReduxMixin(FirebaseFirestoreMixin(PolymerElement)) {
  static get properties () {
    return {
      user: {
        type: Object,
        value: {}
      },
      products: {
        type: Array
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

  getProviderPrice (product) {
    return product.data().providerPrice
  }

  getName (product) {
    return product.data().productName
  }

  getProducts () {
    this.collectionActions('get', 'products').then(docRef => {
      console.log(docRef)
      this.products = docRef.docs
      this.notifyPath('products', docRef.docs)
      this.fillColums()
    }).catch(error => {
      console.error('Error adding document: ', error)
    })
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
    this.getProducts()
  }

  initPage () {
    console.log('letDoIt')
  }

  fillColums () {
    const columns = document.querySelectorAll('vaadin-grid-column')
    console.log(columns)
    /*columns[0].renderer = function(root, column, rowData) {
      root.textContent = rowData.index;
    };*/
  }
}

window.customElements.define('cooperativa-account', CooperativaAcount)
