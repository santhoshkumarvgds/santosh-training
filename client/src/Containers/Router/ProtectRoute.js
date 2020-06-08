import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/Context";
import Auth from "../Auth/Auth";

export default function  ProtectRoute({ component: Component, roles, ...rest }){
  const { role, loginStatus } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        // alert(
        //   role + " " + roles + " " + loginStatus + " " + Auth.authenticateStatus
        // );
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
        } else if (
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
        }
        return <Component {...props} />;
      }}
    />
  );
};
