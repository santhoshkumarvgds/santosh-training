import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/Context";
import Auth from "../Auth/Auth";

export default function ProtectRoute({ component: Component, roles, ...rest }) {
  const { role, loginStatus } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        // alert(
        //   role + " " + roles + " " + loginStatus + " " + Auth.authenticateStatus
        // );
        if (Auth.authenticateStatus == roles) {
          return <Component {...props} />;
        }
        if (
          Auth.authenticateStatus == undefined &&
          role == undefined &&
          !loginStatus
        ) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        } else if (role) {
          return (
            <Redirect
              to={{
                pathname: Auth.authenticateStatus,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}
