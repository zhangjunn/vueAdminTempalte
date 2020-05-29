import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中获取令牌
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title设置页面标题鼠标滑过显示的tite相应路由的title全局已配置
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken() // 声明一个token这个getToken在@/utils/auth里面

  if (hasToken) { // 如果用户有携带token
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })// next({ path: '/' })在router，index里面path为/的页面
      NProgress.done() // 执行一次进度条
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info 取得用户信息user/getInfo是mock数据接口
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          // 移除令牌并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 没有访问权限的其他页将重定向到登录页。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => { // 添加一个全局的后置钩子函数，该函数会在每次路由切换成功进入激活阶段时被调用。
  // finish progress bar
  NProgress.done()
})
