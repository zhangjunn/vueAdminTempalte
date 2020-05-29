import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由和侧边栏
/* Layout */
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'
// 关于router.js的说明
/**
 * 注意：子菜单仅在route children.length>=1时出现
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false） 如401，login等页面
 * alwaysShow: true               当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在breadcrumb面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和breadcrumb面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
    affix: true                  当在声明路由是 添加了 Affix 属性，则当前tag会被固定在 tags-view中（不可被删除）
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * 这里的路由分为两种，constantRoutes 和 asyncRoutes。
 * constantRoutes：代表那些不需要动态判断权限的路由，如登录页、404、等通用页面
 * asyncRoutes： 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。
 */
// 多级目录 在相应的index.vue文件夹里面就加一个<router-view>。
// 多级目录(嵌套路由)如果你的路由是多级目录，
// 如本项目 @/views/nested 那样， 有三级路由嵌套的情况下，不要忘记还要手动在二级目录的根文件下添加一个 <router-view>。

// 当你的路由图太长时，你可以把它分成几个小模块

// 异步路由   需要根据用户角色动态加载的路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  // 404页必须放在末尾！！！
  { path: '*', redirect: '/404', hidden: true }
]
// asyncRoute异步路由   需要根据用户角色动态加载的路由
// 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面 一般在异步路由里面做权限判断
// ！！！ 需要根据用户角色动态加载的路由
export const asyncRoutes = [
  chartsRouter
]
const createRouter = () => new Router({
  // mode: 'history', // mode:'history'，/需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router重置路由器
}

export default router
