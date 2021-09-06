import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getJwt } from "src/services/authService";

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => !getJwt() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
        />
    )
}

export default PublicRoute;