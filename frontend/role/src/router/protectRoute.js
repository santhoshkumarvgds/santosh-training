import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../auth/auth";

export const ProtectRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAuthenticate() == roles && Auth.pendingStatus) {
          return <Component {...props} />;
        } else if (Auth.isAuthenticate() == roles) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
