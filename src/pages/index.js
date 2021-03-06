// export { default as Login } from "./Login";
// export { default as Dashboard } from "./Dashboard";
// export { default as ArticleList } from "./Article";
// export { default as ArticleEdit } from "./Article/Edit";
// export { default as Settings } from "./Settings";
// export { default as NotFound } from "./NotFound";

// A higher order component for loading components with dynamic imports.
import Loadable from "react-loadable";
import { Loading } from "../components";
const Login = Loadable({
  loader: () => import("./Login"),
  loading: Loading
});
const Dashboard = Loadable({
  loader: () => import("./Dashboard"),
  loading: Loading
});
const ArticleList = Loadable({
  loader: () => import("./Article"),
  loading: Loading
});
const ArticleForm = Loadable({
  loader: () => import("./Article/ArticleForm/"),
  loading: Loading
});
const Settings = Loadable({
  loader: () => import("./Settings"),
  loading: Loading
});
const Notifications = Loadable({
  loader: () => import("./Notifications"),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import("./NotFound"),
  loading: Loading
});
const NoAuth = Loadable({
  loader: () => import("./NoAuth"),
  loading: Loading
});
const Profile = Loadable({
  loader: () => import("./Profile"),
  loading: Loading
});

export {
  Login,
  Dashboard,
  ArticleList,
  ArticleForm,
  Settings,
  Notifications,
  NotFound,
  NoAuth,
  Profile
};
