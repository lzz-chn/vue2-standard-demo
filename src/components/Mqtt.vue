<template>
  <div class="mqtt"></div>
</template>

<script>
import mqtt from 'mqtt'
import { messageAdd } from '@/api/system/message'
import { uuid } from '@/utils/common'
import { mapState } from 'vuex'

export default {
  name: 'Mqtt',
  props: {
    topic: { type: [String, Array], default: '' }, // 订阅的主题
    console: { type: Boolean, default: true } // 打印连接信息
  },
  data: () => ({
    client: null,
    wsBase: process.env.VUE_APP_WS
  }),
  computed: { ...mapState(['mqtt']) },
  mounted() {
    if (this.mqtt) {
      this.subscribe(this.topic)
    } else {
      this.init(this.wsBase, this.topic)
    }
  },
  // beforeDestroy() {
  //     this.mqtt && this.unsubscribe(this.topic)
  // },
  methods: {
    // 初始化
    init(wsBase, topic) {
      let option = {
        connectTimeout: 40000,
        clientId: `wisdom_hospital_${uuid(16)}_${new Date().getTime()}`,
        clean: true
      }
      this.$store.commit('mqtt', mqtt.connect(wsBase, option))
      // mqtt连接
      this.console && console.log('开始链接')
      this.mqtt.on('connect', () => {
        this.console && console.log('连接成功')
        this.subscribe(topic)
      })
    },
    // 主题订阅
    subscribe(topic) {
      this.mqtt.subscribe(topic, { qos: 2 }, (error) => {
        if (!error) {
          this.console && console.log('订阅成功 ', topic)
          this.receiveMessages()
        } else {
          this.console && console.log('订阅失败 ', topic)
        }
      })
    },
    // 主题解绑
    unsubscribe(topic) {
      this.mqtt.unsubscribe(topic, {}, (error) => {
        if (!error) {
          this.console && console.log('解绑成功 ', topic)
        } else {
          this.console && console.log('解绑失败 ', topic)
        }
      })
    },
    // 链接并监听消息
    receiveMessages() {
      // 接收消息处理
      this.mqtt.on('message', (topic, message) => {
        this.$emit('receive', topic, JSON.parse(message))
        this.console && console.log(`接收到 ${topic}：${message}`)
      })
      // 断开发起重连
      this.mqtt.on('reconnect', () => {
        this.console && console.log('正在重连')
      })
      // 链接异常处理
      this.mqtt.on('error', (error) => {
        this.console && console.log('连接失败: ', error)
      })
    },
    // 发送消息
    async sendMessages(topic, msg, record = true) {
      if (record) {
        // 保存消息发送记录
        let res = await messageAdd(msg)
        if (res.data) {
          msg.pk = res.data
          this.mqtt.publish(topic, JSON.stringify(msg))
        }
      } else {
        this.mqtt.publish(topic, JSON.stringify(msg))
      }
    }
  }
}
</script>
