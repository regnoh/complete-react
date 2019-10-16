import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { mainRoutes } from "./routes";
import App from "./App";
import "./index.less";
ReactDOM.render(
  <Router>
    <Switch>
      <Route
        path="/admin"
        render={routeProps => {
          // TODO: 权限， 需要登录才能访问/admin
          return <App {...routeProps} />;
        }}
      />
      {mainRoutes.map(r => {
        return <Route key={r.path} {...r} />;
      })}

      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" exact />
    </Switch>
  </Router>,
  document.querySelector("#root")
);
