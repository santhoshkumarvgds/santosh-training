import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/Context";

export const ProtectRoute = ({ component: Component, roles, ...rest }) => {
  const { role, loginStatus } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (role == roles) {
          // alert(role);
          return <Component {...props} />;
        }
        if (role) {
          return (
            <Redirect
              to={{
                pathname: role,
                state: { from: props.location },
              }}
            />
          );
        } else if (role == undefined && loginStatus) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};
