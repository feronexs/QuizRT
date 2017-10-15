// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { store } from './store'
import AlertComp from './components/shared/Alert'
import AlertCompSuccess from './components/shared/AlertSuccess'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.component('app-alert', AlertComp)
Vue.component('app-alert-success', AlertCompSuccess)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBcemE0JuLjsLLs1bGTc0LdMW2Tw2NHGPE',
      authDomain: 'prueba-2aa79.firebaseapp.com',
      databaseURL: 'https://prueba-2aa79.firebaseio.com',
      projectId: 'prueba-2aa79',
      storageBucket: 'prueba-2aa79.appspot.com',
      messagingSenderId: '755595950672'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('consultaSemestresFire')
        this.$store.dispatch('consultaMiPerfil')
      }
    })
  }
})
