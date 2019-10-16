import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { adminRoutes } from "./routes";
import { Frame } from "./components";

// import { HocWrappedComp, TestAntd } from "./tests";
const App = () => {
  return (
    <div>
      <Frame />
      <Switch>
        {adminRoutes.map(({ path, exact, component: Component }) => {
          return (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={routeProps => <Component {...routeProps} />}
            />
          );
        })}
        {/* /admin -> /admin/dashboard */}
        <Redirect to={adminRoutes[0].path} from="/admin" exact />
        {/* /admin/xxxx -> 404  */}
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default App;
