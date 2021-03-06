import actionTypes from "../actions/types";
// const initialUser = {
//   id: "",
//   nickname: "",
//   role: "",
//   avatar: ""
// };
const initState = () => {
  const isLogin =
    Boolean(localStorage.getItem("authToken")) ||
    Boolean(sessionStorage.getItem("authToken"));
  const user = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user")
  );
  return {
    isLoading: false,
    isLogin,
    user
  };
};
const initialState = {
  ...initState()
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
    case actionTypes.EDIT_PROFILE_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.EDIT_PROFILE_SUCCESS:
      return payload.id === state.user.id
        ? {
            ...state,
            isLoading: false,
            user: { ...state.user, ...payload.values }
          }
        : initialState;

    case actionTypes.EDIT_PROFILE_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
