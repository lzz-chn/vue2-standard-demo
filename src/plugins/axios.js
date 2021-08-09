import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '@/store'

const notify = Vue.prototype.$notify // 修改为当前UI框架对应的消息提示组件
let loadTimeOutId = null

axios.defaults.baseURL = process.env.VUE_APP_API

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 是否添加 token
    if (store.state.token) {
      config.headers['TOKEN'] = sessionStorage.getItem('token') // ['TOKEN']修改为接口对应的token名称
    }
    store.state.hideLoading || store.commit('loading', true) // 开启加载遮罩
    loadTimeOutId && clearTimeout(loadTimeOutId)
    return config
  },
  (error) => {
    notify.error('请求异常')
    store.commit('loading', false) // 关闭加载遮罩
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    store.state.hideLoading && store.commit('hideLoading', false)
    if (response.data.code !== 0) {
      store.commit('loading', false) // 关闭加载遮罩
      store.state.noMessage || (response.data.msg && notify.error(response.data.msg))
      store.state.noMessage && store.commit('noMessage', false)
      return Promise.resolve(response.data)
    }
    loadTimeOutId = setTimeout(() => {
      store.commit('loading', false) // 关闭加载遮罩
    }, 500)
    return Promise.resolve(response.data)
  },
  (error) => {
    notify.error('响应异常')
    store.commit('loading', false) // 关闭加载遮罩
    return Promise.reject(error)
  }
)

Plugin.install = (Vue) => {
  Vue.prototype.$axios = {
    // 封装 全参数
    default(config) {
      return axios(config)
    },
    // 封装 get
    get(url, params) {
      return axios.get(url, { params })
    },
    // 封装 post
    post(url, params) {
      return axios.post(url, qs.stringify(params))
    },
    // 封装 all
    all(config) {
      return axios.all(config)
    },
    spread(config) {
      return axios.spread(config)
    }
  }
}

Vue.use(Plugin)

export default Vue.prototype.$axios
