import Vue from 'vue'
import Vuex from 'vuex'
import { MyUserState } from './modules/user'
// import user from './modules/user'

Vue.use(Vuex)

// 这部分为以前的方式，下面是以ts的方式注入
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     user
//   }
// })

export interface MyRootState {
  user: MyUserState;
}

export default new Vuex.Store<MyRootState>({})