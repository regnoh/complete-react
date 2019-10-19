import actionTypes from "./types";
import { requestLogin } from "../services";
export const login = values => dispatch => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  requestLogin(values)
    .then(res => {
      if (res.data.code === 200) {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data.data });
      } else {
        dispatch({ type: actionTypes.LOGIN_FAILED });
      }
    })
    .catch(err => {
      dispatch({ type: actionTypes.LOGIN_FAILED });
    });
};
