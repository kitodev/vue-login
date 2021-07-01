import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Login from "./components/Login.vue";
import Data from "./components/Data.vue";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }, 
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
});

require("./assets/main.scss")

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Login },
    { path: "/data", component: Data },
  ],
});

new Vue({
  render: h => h(App),
  store: store,
  router,
}).$mount('#app')
