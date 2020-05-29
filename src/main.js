import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
//  CSS重置的现代替代方法
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n 中英文切换

import '@/styles/index.scss' // global css 全局css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * *如果不想使用模拟服务器
 * 您想将MockJs用于mock api
* 您可以执行：mockXHR（）
*
 *目前MockJs将用于生产环境，
 *请在上线前删除！
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
