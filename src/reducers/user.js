import actionTypes from "../actions/types";
const isLogin =
  Boolean(localStorage.getItem("authToken")) ||
  Boolean(sessionStorage.getItem("authToken"));
const user = JSON.parse(
  localStorage.getItem("user") || sessionStorage.getItem("user")
);
const initialState = {
  isLoading: false,
  isLogin,
  user
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
        isLogin: true
      };
    case actionTypes.LOGIN_FAILED:
      return initialState;
    case actionTypes.LOGOUT:
      return initialState; //退出登录时清空localStorage&sessionStorage,不需要手动刷新或路由操作就会跳转到登录页面

    default:
      return state;
  }
};
