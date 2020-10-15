/**
 * Vue项目中是怎么引入VueRouter。
  1.安装VueRouter，再通过import VueRouter from 'vue-router'引入
  2.先 const router = new VueRouter({...}),再把router作为参数的一个属性值，new Vue({router})
  3.通过Vue.use(VueRouter) 使得每个组件都可以拥有store实例
 *
 * VueRouter 是一个类
 * 使用了Vue.use(),而Vue.use的一个原则就是执行对象的install这个方法
 */

 let Vue = null;

//  新增一个对象，用来管理当前的路径
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash';
    // 这是传递的路由
    this.routes = options.routes || [];
    this.routesMap = this.createMap(this.routes)
    // console.log(this.routesMap, 'routesMap');
    // 实例化一个管理路由的对象，此时当前路径是null，需进行初始化
    this.history = new HistoryRoute();
    this.init();
  }

  createMap(routes){
    return routes.reduce((pre,current)=>{
        pre[current.path] = current.component
        return pre;
    },{})
  }

  init() {
    // 初始化当前的路径
    // 判断当前是hash模式还是history模式
    if(this.mode === 'hash') {
      // 先判断用户打开时有没有hash值，没有的话跳转到#/
      location.hash ? '' : location.hash = "/";
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      // history模式
      location.pathname ? '' : location.pathname = "/";
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }
}

VueRouter.install = function(v) {
  // 调用install方法时，会将Vue作为参数传入。install方法被同一个插件多次调用时，插件也只会被安装一次。
  // install 一般是给每个vue实例添加东西的 在这里就是给每个组件添加 $route 和 $router。
  Vue = v;
  console.log(v, 'vue');

  /**
   * 在main.js中将我们的路由引入并作为Vue的一个参数进行实例化，但是当前只是根组件App有router值，其他组件是没有的
   * 所以在这里我们通过混入的方法为其他组件也加上router值，拥有这个值，成为全局属性
   */
  // 给每个组件添加$route和$router。
  Vue.mixin({
    /**
     * 父beforeCreate-> 父created -> 父beforeMounte -> 子beforeCreate ->子create
     *  ->子beforeMount ->子 mounted -> 父mounted
     * 这是父子组件渲染的顺序
     * 也就是在判断为子组件时，可以获取到父组件的_root信息
     * 
     * 为什么是beforeCreate，如果是在created操作的话，$options已经初始化好了。
     * 
     */
    beforeCreate() {
      if(this.$options && this.$options.router) {
        // this.$options 在选项中包含自定义 property 时会有用处
        // 把当前实例挂载到_root上
        this._root = this;
        this._router = this.$options.router;
        // 改变路径，视图是没有重新渲染的，所以需要将_router.history进行响应式化。Vue.util.defineReactive监听变化的执行者
        Vue.util.defineReactive(this,"xxx",this._router.history)

        /**
         * 当我们第一次渲染router-view这个组件的时候，会获取到this._router.history这个对象，从而就会被监听到获取
         * this._router.history。就会把router-view组件的依赖wacther收集到this._router.history对应的收集器dep中，
         * 因此this._router.history每次改变的时候。this._router.history对应的收集器dep就会通知router-view的组件
         * 依赖的wacther执行update()，从而使得router-view重新渲染（其实这就是vue响应式的内部原理）
         */
      } else {
        // 如果是子组件
        this._root = this.$parent && this.$parent._root
      }
      Object.defineProperty(this,'$router',{
        // 将$router挂载到组件实例上。
        get() {
          return this._root._router
        }
      })
      // 实现$route
      Object.defineProperty(this, '$route', {
        get() {
          return this._root._router.history.current
        }
      })
    } 
  })

   // 创建组件
  Vue.component('router-link',{
    props: {
      to: String
    },
    render(h){
      let mode = this._self._root._router.mode;
      let to = mode === 'hash' ? '#' + this.to : this.to;
      console.log(to, 'to')
      return h('a', { attrs: {href: to} }, this.$slots.default)
      // return h('a',{},'首页')
    }
  })
  Vue.component('router-view',{
    render(h){
      /**
       * render函数里的this指向的是一个Proxy代理对象，代理Vue组件，而我们前面讲到每个组件都有一个_root属性指向根组件，
       * 根组件上有_router这个路由实例。所以我们可以从router实例上获得路由表，也可以获得当前路径。
       * 然后再把获得的组件放到h()里进行渲染。
       */
      let current = this._self._root._router.history.current
      let routeMap = this._self._root._router.routesMap;
      console.log(current,routeMap, 'renderthis')
      return h(routeMap[current])
      // return h('h1', {}, current)
    }
  })
}

export default VueRouter


/**
 * 理解实现过程
 * 1、VueRouter是一个对象，且通过Vue.use()来安装路由功能，接收的参数有mode、routes。分别是路由模式和路由数组
 * 2、Vue.use()是Vue用来安装插件的，接收的参数是方法或者含有install方法的对象。那么VueRouter最主要的部分就是install方法
 * 3、VueRouter中install方法需要实现的功能： （1）、为所有组件的实例挂载属性$router和$route;（2）、定义router-link和router-view组件
 *  3-1、先初始化install方法，将必要的骨架搭上。将两个组件写上，并测试是否成功（表示我们自己的VueRouter对象可用）
 *  3-2、实现给所有组件挂载$router属性。通过vue混入的方式为所有组件加上属性。当前的根组件是有此属性的（在main.js中路由对象是作为一个参数传入
 *       Vue进行实例化的，且为根组件），通过此特性对其他组件拿到根组件信息来设置属性，注意使用的是beforeCreate
 *  3-3、挂载$route。第一步创建一个对象historyRoute用来保存当前的路由；第二步处理参数routes，转换为key：value对象的形式进行管理，使用路径path作为
 *       key，当前路径为value，并保存这个管理对象；第三步初始化当前路径，判断hash还是history，采用事件监听的方式来初始化，与js实现前路由方式一致，
 *       并将当前浏览器路径赋值给当前路由current保存
 *  3-4、更新router-view组件。通过拿到当前保存的路由，以及路由对象来渲染组件内容。
 *  3-5、更新router-link组件，使用a标签来实现路由跳转
 */