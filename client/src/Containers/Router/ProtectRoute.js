import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context, { UserContext } from "../Context/Context";
import Auth from "../Auth/Auth";

export default function ProtectRoute({ component: Component, roles, ...rest }) {
  const { role, loginStatus } = useContext(UserContext);
  return (
    <Context>
      <Route
        {...rest}
        render={(props) => {
          // alert(
          //   role +
          //     " " +
          //     roles +
          //     " " +
          //     loginStatus +
          //     " " +
          //     Auth.authenticateStatus
          // );

          if (
            Auth.authenticateStatus == roles
          ) {
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

          // if (
          //   Auth.authenticateStatus == roles ||
          //   Auth.authenticateStatus == role
          // ) {
          //   return <Component {...props} />;
          // } else if (roles != "user" && Auth.authenticateStatus && role) {
          //   return (
          //     <Redirect
          //       to={{
          //         pathname: "/",
          //         state: {
          //           from: props.location,
          //         },
          //       }}
          //     />
          //   );
          // }
          // if (roles == "user" && !loginStatus) {
          //   return <Component {...props} />;
          // }

          // if (loginStatus) {
          //   return (
          //     <Redirect
          //       to={{
          //         pathname: roles,
          //         state: {
          //           from: props.location,
          //         },
          //       }}
          //     />
          //   );
          // }

          // if (
          //   Auth.authenticateStatus == undefined &&
          //   role == undefined &&
          //   !loginStatus
          // ) {
          //   return (
          //     <Redirect
          //       to={{
          //         pathname: "/",
          //         state: { from: props.location },
          //       }}
          //     />
          //   );
          // }

          return <Component {...props} />;
        }}
      />
    </Context>
  );
}
