import axios from 'axios'
import qs from 'qs'
import store from '@/store'
const notify = {} // 消息通知插件

const _axios = axios.create({ baseURL: process.env.VUE_APP_API })

// 请求拦截器
_axios.interceptors.request.use(
  (config) => {
    // 是否移除 token
    if (config?.token) {
      config.headers['JZ-MEDICAL-TOKEN'] = sessionStorage.getItem('token')
    }
    store.commit('loading', true) // 加载中
    return config
  },
  (error) => {
    notify.error('请求异常')
    store.commit('loading', false) // 加载结束
    return Promise.error(error)
  }
)

// 响应拦截器
_axios.interceptors.response.use(
  (response) => {
    store.commit('loading', false)
    if (response.data.code !== 0) {
      // 是否展示提示信息
      if (response.config?.message) {
        notify.error(response.data.msg)
      }
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    notify.error('响应异常')
    store.commit('loading', false)
    return Promise.reject(error)
  }
)

/**
 * @description 处理实参
 * @param {Array} argument
 * @returns axios 需要的参数
 */
function processParams(argument) {
  const params = argument[0]
  //  message:展示接口返回信息  token:添加token到请求头
  const config = { message: true, token: true, ...argument[1] }
  return { params, config }
}

export default {
  // 封装 全参数
  default(config) {
    return _axios(config)
  },
  // 封装 get
  get(url, ...argument) {
    let { params, config } = processParams(argument)
    return _axios.get(url, params, config)
  },
  // 封装 post
  post(url, ...argument) {
    let { params, config } = processParams(argument)
    return _axios.post(url, qs.stringify(params), config)
  }
}
