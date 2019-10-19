import axios from "axios";
import { message } from "antd";
// This API enables cross-origin requests to anywhere
// "https://cors-anywhere.herokuapp.com/";

// 1. 在 http://rap2.taobao.org/ 创建接口
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/http://rap2api.taobao.org/app/mock/233783";
// 2. postman测试接口
// 3. axios
const isDev = process.env.NODE_ENV === "development"; // webpack
const service = axios.create({
  baseURL: isDev ? BASE_URL : ""
});

service.interceptors.request.use(config => {
  // 每个请求都带上token
  config.data = {
    ...config.data,
    // TODO: 登录功能未实现
    // authToken: window.localStorage.getItem("authToken")
    authToken: "asdasas"
  };
  return config;
});
service.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res.data.data;
  } else {
    // 全局处理错误
    message.error(res.data.errMsg);
  }
});
export default service;
