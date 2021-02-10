import axios from 'axios'
import { Message } from 'view-design'

const service = axios.create({
  baseURL: 'http://localhost:8010',
  headers: {
    class: "H5200318"
  }
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if(config.url.indexOf('?')>0){
    config.url=config.url+'&_time='+Math.random()*100000
  }
  else{
    config.url=config.url+'?_time='+Math.random()*100000
  }

  //debugger
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let data = response.data
    if (data.code == 200) {
      return data;
    }
    else {
      Message.error(data.message || '服务器内部错误')
      return data;
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service