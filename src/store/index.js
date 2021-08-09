import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: true, // 请求头添加 token
    loading: false, // 加载遮罩
    hideLoading: false, // 隐藏加载遮罩
    noMessage: false, // 隐藏接口响应信息
    mqtt: null // mqtt对象
  },
  mutations: {
    token(state, payload) {
      if (typeof payload === 'boolean') {
        state.token = payload
      }
    },
    loading(state, payload) {
      if (typeof payload === 'boolean') {
        state.loading = payload
      }
    },
    hideLoading(state, payload) {
      if (typeof payload === 'boolean') {
        state.hideLoading = payload
      }
    },
    noMessage(state, payload) {
      if (typeof payload === 'boolean') {
        state.noMessage = payload
      }
    },
    mqtt(state, payload) {
      state.mqtt = payload
    }
  },
  actions: {},
  modules: {}
})
