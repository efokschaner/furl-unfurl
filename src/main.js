// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App'

import Furl from './components/Furl'
import Unfurl from './components/Unfurl'
const NotFoundComponent = { template: '<p>Page Not Found</p>' }

const routes = [
  { path: '/', component: Furl },
  { path: '/unfurl', component: Unfurl },
  { path: '*', component: NotFoundComponent }
]

const router = new VueRouter({
  routes,
  base: '/furl-unfurl/'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
