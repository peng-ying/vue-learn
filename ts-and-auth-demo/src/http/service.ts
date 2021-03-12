import axios from 'axios'
// import { Message } from 'ant-design-vue'

const service = axios.create({
  baseURL: (window as any).globalUrl.baseUrl, // api的baseUrl,
  timeout: 5000,
})

service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(sessionStorage.getItem('access_token')) {
    config.headers = {
      'Authorization': sessionStorage.getItem('access_token')
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;