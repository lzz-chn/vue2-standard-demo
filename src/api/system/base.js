import axios from '@/plugins/axios'

// 账号登录
export const login = (params) => axios.post('/jz-medical-center/login/loginAction', params)
