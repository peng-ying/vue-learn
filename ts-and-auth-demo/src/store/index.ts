import Vue from 'vue'
import Vuex from 'Vuex'
import menu from './modules/menu'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu
  },
  getters
})
