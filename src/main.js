// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import VConsole from 'vconsole'
import vueSignature from 'vue-signature'
Vue.use(vueSignature)
Vue.config.productionTip = false

import 'common/stylus/index.styl'
import 'common/js/rem.js'
/* eslint-disable no-unused-vars */
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

let host = window.location.host
if (host !== 'jimuwang.com.cn') {
  new VConsole()
}