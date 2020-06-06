import React, { Component,useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../auth/auth";

export const ProtectRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
      if (Auth.isAuthenticateUser() && Auth.authenticateStatus==roles){
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname:Auth.authenticateStatus,
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
