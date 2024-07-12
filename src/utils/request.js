//自定义axios
// axios定制化
import axios from "axios";
import store from "@/store/index.js";
const request = axios.create({
  baseURL: '',
  timeout: 5000,
});
// 请求拦截器
request.interceptors.request.use((config) => {

  return config;
});

// 响应拦截器
request.interceptors.response.use(

);

export default request;

