import actionTypes from "../actions/types";
const initialState = {
  isLoading: false,
  isLogin: false,
  user: {
    id: "",
    nickname: "",
    avatar: "",
    role: ""
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: { ...payload },
        isLoading: false,
        isLogin: true
      };
    case actionTypes.LOGIN_FAILED:
      return initialState;

    default:
      return state;
  }
};
