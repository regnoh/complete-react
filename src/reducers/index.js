// import { combineReducers } from "redux";
import { combineReducers } from "redux-immutable";
import notifications from "./notifications";
import user from "./user";
export default combineReducers({
  notifications,
  user
});
