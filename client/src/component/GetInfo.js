import React from "react";
import { UserConsumer } from "../Containers/Context/Context";

export default () => {
  return (
    <UserConsumer>
      {(user) => {
        return (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        );
      }}
    </UserConsumer>
  );
};
