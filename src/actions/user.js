import actionTypes from "./types";
import { requestLogin, updateUser } from "../services";
import { message } from "antd";
export const login = values => dispatch => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  requestLogin(values)
    .then(res => {
      const { errMsg, code, data } = res.data;
      const { authToken, user } = data;
      if (code === 200) {
        if (values.remember) {
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("user", JSON.stringify({ ...user }));
        } else {
          sessionStorage.setItem("authToken", authToken);
          sessionStorage.setItem("user", JSON.stringify({ ...user }));
        }
        message.success(`${user.nickname}, 登录成功`);
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
      } else {
        message.error(errMsg);
        dispatch({ type: actionTypes.LOGIN_FAILED });
      }
    })
    .catch(err => {
      message.error(err.message);
      dispatch({ type: actionTypes.LOGIN_FAILED });
    });
};
export const logout = () => dispatch => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  dispatch({ type: actionTypes.LOGOUT });
};

export const editUser = (id, values) => dispatch => {
  // console.log("...............", id, values);
  dispatch({ type: actionTypes.EDIT_PROFILE_REQUEST });
  updateUser(id, values)
    .then(res => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      const sessionUser = JSON.parse(sessionStorage.getItem("user"));
      localUser
        ? localStorage.setItem(
            "user",
            JSON.stringify({ ...localUser, ...values })
          )
        : sessionStorage.setItem(
            "user",
            JSON.stringify({ ...sessionUser, ...values })
          );
      dispatch({
        type: actionTypes.EDIT_PROFILE_SUCCESS,
        payload: { id, values }
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.EDIT_PROFILE_FAILED
      });
    });
};
