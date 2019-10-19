import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { mainRoutes } from "./routes";
import App from "./App";
import "./index.less";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/admin" component={App} />
          {mainRoutes.map(r => {
            return <Route key={r.path} {...r} />;
          })}

          <Redirect to="/admin" from="/" exact />
          <Redirect to="/404" exact />
        </Switch>
      </Router>
    </Provider>
  </ConfigProvider>,
  document.querySelector("#root")
);
