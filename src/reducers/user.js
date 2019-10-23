import actionTypes from "../actions/types";
import { fromJS } from "immutable";

const initialState = () => {
  const isLogin =
    Boolean(localStorage.getItem("authToken")) ||
    Boolean(sessionStorage.getItem("authToken"));
  const user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
  return fromJS({
    isLoading: false,
    isLogin,
    user
  });
};

export default (state = initialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN_REQUEST:
      return state.set("isLoading", true);
    // return { ...state, isLoading: true };
    case actionTypes.LOGIN_SUCCESS:
      return state.merge({
        user: payload,
        isLoading: false,
        isLogin: true
      });
    // return {
    //   ...state,
    //   user: payload,
    //   isLoading: false,
    //   isLogin: true
    // };
    case actionTypes.LOGIN_FAILED:
      return initialState;
    case actionTypes.LOGOUT:
      return initialState; //退出登录时清空localStorage&sessionStorage,不需要手动刷新或路由操作就会跳转到登录页面
    case actionTypes.EDIT_PROFILE_REQUEST:
      return state.set("isLoading", true);
    // return { ...state, isLoading: true };
    case actionTypes.EDIT_PROFILE_SUCCESS:
      return payload.id === state.getIn(["user", "id"])
        ? state.merge({
            isLoading: false,
            user: state.merge({
              avatar: payload.values.avatar,
              nickname: payload.values.nickname
            })
          })
        : // ? {
          //     ...state,
          //     isLoading: false,
          //     user: { ...state.user, ...payload.values }
          //   }
          initialState;

    case actionTypes.EDIT_PROFILE_FAILED:
      return state.set("isLoading", false);
    // return { ...state, isLoading: false };
    default:
      return state;
  }
};
