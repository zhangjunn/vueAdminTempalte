import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url ||  url=基本url+请求url
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 5000 // request timeout 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发出请求前做点什么

    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['X-Token'] is a custom headers key['X-Token']是自定义头密钥
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取诸如头或状态之类的http信息
   * 请返回response=>response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 您还可以通过HTTP状态代码判断状态
   */
  response => {
    const res = response.data

    // 如果自定义代码不是20000，则判断为错误。
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 50008:非法令牌；50012:其他客户端登录；50014:令牌过期；
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login重新登录
        // 您已注销，您可以取消停留在此页，或重新登录，'确认注销'
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
