// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import BootstrapVue from 'bootstrap-vue'
import '@/../bootstrap/css/bootstrap.css'
import './scss/styles.scss'
import './scss/popup.scss'
import './scss/dropdown.scss'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
