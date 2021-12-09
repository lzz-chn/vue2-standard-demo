import axios from '@/plugins/axios'

// 添加消息
export const messageAdd = (params) => axios.post('/jz-medical-center/s/message/add', params)
// 修改消息
export const messageUpdate = (params) =>
  axios.post('/jz-medical-center/s/message/updateStatus', params)
// 分页查询消息
export const messageQueryByPage = (params) =>
  axios.post('/jz-medical-center/s/message/queryPage', params)
// 查询消息列表
export const messageQueryList = (params) =>
  axios.post('/jz-medical-center/s/message/queryList', params)
