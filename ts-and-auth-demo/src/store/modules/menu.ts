import { Commit, Dispatch } from 'vuex'
import { getMenus } from '../../api/login'

const state = {
  menus: []
}

const getters = {
  getMenus: (state: any): Array<any> => {
    return state.menus
  }
}

const mutations = {
  setMenus: (state: any, data: object[]) => {
    state.menus = data;
  }
}

const actions = {
  dispatchMenus: (commit : Commit, dispatch: Dispatch,  role: string) => {
    let params = {
      role: role
    }
    getMenus(params)
    .then(res => {
      let {code, data} = res as any;
      if(code == 200) {
        commit('setMenus', data.lists)
        // dispatch();
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}