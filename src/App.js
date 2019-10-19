import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { adminRoutes } from "./routes";
import { Frame } from "./components";

// import { HocWrappedComp, TestAntd } from "./tests";
const App = ({ isLogin, user }) => {
  return isLogin ? (
    <Frame>
      <Switch>
        {adminRoutes.map(({ path, exact, component: Component, roles }) => {
          return (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={routeProps => {
                const hasPermission = roles.includes(user.role);
                return hasPermission ? (
                  <Component {...routeProps} />
                ) : (
                  <Redirect to="/admin/noauth" />
                );
              }}
            />
          );
        })}
        {/* /admin -> /admin/dashboard */}
        <Redirect to={adminRoutes[0].path} from="/admin" exact />
        {/* /admin/xxxx -> 404  */}
        <Redirect to="/404" />
      </Switch>
    </Frame>
  ) : (
    <Redirect to="/login" />
  );
};
const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  user: user.user
});

export default connect(mapStateToProps)(App);
