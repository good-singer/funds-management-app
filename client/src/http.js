import { Loading, Message } from 'element-ui';
import axios from 'axios';
import router from './router';

let loading=null;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

function endLoading() {
  loading.close();
}

/*
// 创建一个axios实例
const axiosService = axios.create({
  baseURL: '/',
  timeout: 5000
})
*/

// axios.defaults.baseURL = 'https://www.apiopen.top/'

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 加载动画
    startLoading();
    if (localStorage.fmToken) {
      // 设置统一的请求头header
      config.headers.Authorization = localStorage.fmToken;
    }

    return config;
  }, 
  error => {
    return Promise.reject(error);
  }
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 结束加载动画
    endLoading();
    return response;
  },
  error => {
    // 错误提醒
    endLoading();
    Message.error(error.response.data);

    // 获取错误状态码
    const { status } = error.response;
    if (status == 401) {
      Message.error("token失效，请重新登录!");
      // 清除token
      localStorage.removeItem('fmToken');
      // 跳转到登录页面
      router.push('/login');
    }

    return Promise.reject(error);
  }
)

export default axios