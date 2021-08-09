import Vue from 'vue'
import mqtt from '@/components/Mqtt'

const _mqtt = {
  install(Vue) {
    Vue.component('base-mqtt', mqtt)
  }
}

Vue.use(_mqtt)
