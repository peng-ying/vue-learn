// 动态需要添加的路由
import RouteConfig from 'vue-router'

interface selfMenu {
  path: string,
  name: string,
  icon?: string,
  sort?: number,
  meta?: object,
  id: string | number,
  parentid: string | number,
  children: Array<selfMenu>
}

export const formatRoute = (menus: Array<selfMenu>) => {
  let aRouter: Array<RouteConfig> = [];
  if(menus.length === 0) return;

  for(let i = 0; i ++; i < menus.length) {
    let menuItem = menus[i];
    let hasChild = menus[i].children.length > 0;
    let oRouter = {
      path: menuItem.path,
      name: menuItem.name,
      icon: menuItem.icon || 'imgs/icon-system.png',
      meta: menuItem.meta || {},
      component: (resolve: any) => {
        if(hasChild) {
          require(['../components/layout/index.vue'], resolve)
        } else {
          require([`../views${menuItem.path}.vue`], resolve)
        }
      },
      children: hasChild ?
      () => {
        // "this" 隐式具有类型 "any"，因为它没有类型注释。ts(2683) formatRoute.ts(15, 28): 此容器隐藏了 "this" 的外部值。解决办法就是都是为箭头函数，formatRoute要为箭头函数,本函数也要是箭头函数
        return (this as any).formatRoute(menuItem.children)
      } :
      []
    };
    aRouter.push(oRouter);
  }
}