import actionTypes from "./types";
import { fetchNotifications } from "../services";
export const getNotifications = () => dispatch => {
  dispatch({ type: actionTypes.GET_NOTIFICATIONS_REQUEST });
  fetchNotifications()
    .then(res => {
      dispatch({
        type: actionTypes.GET_NOTIFICATIONS_SUCCESS,
        payload: res
      });
    })
    .catch(err => {
      dispatch({ type: actionTypes.GET_NOTIFICATIONS_FAILED });
    });
};

export const markAsRead = id => dispatch => {
  setTimeout(() => {
    dispatch({ type: actionTypes.MARK_AS_READ, payload: id });
  }, 2000);
};
export const markAllAsRead = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: actionTypes.MARK_ALL_AS_READ });
  }, 2000);
};
