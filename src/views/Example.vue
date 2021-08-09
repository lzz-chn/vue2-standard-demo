<template>
  <div class="example-vue">
    <h3>example vue</h3>
    <!-- mqtt 调用方法 -->
    <base-mqtt ref="mqtt" topic="example" @receive="getMqttMessage" />
  </div>
</template>

<script>
import { login } from '@/api/system/base'

export default {
  name: 'ExampleVue',
  data: () => ({}),
  methods: {
    // http请求
    async httpRequest() {
      let res = await login({ username: 'username', password: 'password' })
      console.log('res :>> ', res)
    },
    // 发送mqtt消息
    sendMqttMessage(topic, msg) {
      this.$refs.mqtt && this.$refs.mqtt.sendMessages(topic, msg)
    },
    // 获取mqtt消息
    getMqttMessage(topic, msg) {
      console.log('topic :>> ', topic)
      console.log('msg :>> ', msg)
    }
  }
}
</script>

<style lang="less" scoped>
.example-vue {
}
</style>
