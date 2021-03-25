declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vuex' {
  // import vuex from 'vuex'
  // export default vuex
  interface Vuex {
    Commit: Commit,
    Dispatch: Dispatch
  }
  export default Vuex
}

declare module 'vue-router' {
  import router from 'vue-router'
  export default router
  // interface vueRouter {
  //   VueRouter: VueRouter,
  //   RouteConfig: RouteConfig
  // }
  // export default vueRouter
}

declare module 'ant-design-vue' {
  const Ant: any
  export default Ant
}

declare module 'vue-property-decorator';