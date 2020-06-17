import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import store from './store'
import './assets/styles/index.css'

Vue.config.productionTip = false

Vue.use(Router)
const router = new Router({})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
