import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getJwt } from "src/services/authService";
// handle the private routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getJwt() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
