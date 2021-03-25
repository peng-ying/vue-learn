// 静态路由 无需权限
const staticRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue') // ts要带文件后缀
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]