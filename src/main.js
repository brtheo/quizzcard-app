import Vue from 'vue'

import App from './App.vue'

import router from './router'

import './vue.conf'

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})


