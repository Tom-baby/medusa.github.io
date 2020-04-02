import Vue from 'vue';
import App from './App.vue'
import VueApollo from 'vue-apollo'
import { apolloClient } from './apollo-client'
import VueRouter from 'vue-router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)
Vue.use(VueRouter)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  el: '#root',
  provide: apolloProvider.provide(), 
  render(h) {
    return h(App);
  }
})