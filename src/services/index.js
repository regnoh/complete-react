import axios from "axios";
import { message } from "antd";
// This API enables cross-origin requests to anywhere
// "https://cors-anywhere.herokuapp.com/";

// 1. 在 http://rap2.taobao.org/ 创建接口
// 2. postman测试接口
// 3. axios
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/http://rap2api.taobao.org/app/mock/233783";

const isDev = process.env.NODE_ENV === "development"; // webpack
const service = axios.create({
  baseURL: isDev ? BASE_URL : ""
});

service.interceptors.request.use(config => {
  // 每个请求都带上token
  config.data = {
    ...config.data,

    authToken:
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  };
  return config;
});
service.interceptors.response.use(res => {
  if (res.data.code === 200) {
    if (res.data.data.msg) {
      message.success(res.data.data.msg);
    }
    return res.data.data;
  } else {
    // 全局处理错误
    message.error(res.data.errMsg);
  }
});
// 文章管理
const ARTICLE_URL = "/api/v1/articles";
// offset limited: 分页
export const fetchArticles = (offset = 0, limited = 10) => {
  return service.post(ARTICLE_URL, { offset, limited });
};
export const deleteArticle = id => {
  return service.delete(`${ARTICLE_URL}/${id}`);
};
export const fetchArticle = id => {
  return service.post(`${ARTICLE_URL}/${id}`);
};
export const updateArticle = (id, values) => {
  return service.put(`${ARTICLE_URL}/${id}`, values);
};

export const fetchAmounts = () => {
  return service.post(`${ARTICLE_URL}/amount`);
};
// 通知中心
const NOTIFICATIONS_URL = "/api/v1/notifications";
export const fetchNotifications = (offset = 0, limited = 10) => {
  return service.post(NOTIFICATIONS_URL, { offset, limited });
};
// 用户登录注册
const noInterceptService = axios.create({
  baseURL: isDev ? BASE_URL : ""
});
const USER_URL = "/api/v1/user";
export const requestLogin = values => {
  return noInterceptService.post(`${USER_URL}/login`, values);
};
export const updateUser = (id, values) => {
  return service.put(`${USER_URL}/${id}`, values);
};
