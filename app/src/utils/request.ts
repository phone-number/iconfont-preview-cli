import axios from 'axios';

export const service = axios.create({
  baseURL: '/api',
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  return response.data;
})