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
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
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
    </Router>
  </ConfigProvider>,
  document.querySelector("#root")
);
