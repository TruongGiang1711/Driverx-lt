import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const NotFound = React.lazy(() => import("./views/pages/page404/NotFound.js"));

const App = () => {
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          {/* <PublicRoute path="/login" name="Login Page" render={props => <Login {...props} />} /> */}
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <NotFound {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <PrivateRoute path="/" component={TheLayout} />
          {/* <PrivateRoute path="/" name="Home" render={props => <TheLayout {...props} />} /> */}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
