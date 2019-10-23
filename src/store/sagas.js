import actionTypes from "../actions/types";
import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./services";

function* getNotifications() {
  try {
    const notifications = yield call(Api.fetchNotifications);
    yield put({
      type: actionTypes.GET_NOTIFICATIONS_REQUEST,
      notifications: notifications
    });
  } catch (e) {
    yield put({
      type: actionTypes.GET_NOTIFICATIONS_FAILED,
      message: e.message
    });
  }
}
function* notificationSaga() {
  yield takeLatest(actionTypes.GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export default notificationSaga;
