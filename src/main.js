// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import './assets/js/rem'
// require('./assets/js/vconsole.js')
// import Vconsole from './assets/js/vconsole'
import Bridge from './assets/js/bridge' //引入webviewbridge
Vue.prototype.$bridge = Bridge

Vue.config.productionTip = false
// 全局js
import base from './base'
Vue.use(base)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
