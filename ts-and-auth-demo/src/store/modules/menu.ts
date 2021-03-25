// import { Commit, Dispatch } from 'vuex'
import { Commit, Dispatch } from 'Vuex'
import { getMenus } from '../../api/login'
import { getStore, setStore, removeStore } from '../../util/util'

const menu = {
  state: {
    menus: getStore('menu') || []
  },
  
  // getters: {
  //   getMenus: (state: any): Array<any> => {
  //     return state.menus
  //   }
  // },
  
  mutations: {
    setMenus: (state: any, data: object[]) => {
      state.menus = data;
      setStore('menu', data);
    }
  },
  
  actions: {
    getMenus: (commit : Commit, dispatch: Dispatch,  role: string) => {
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
  
}

export default menu;