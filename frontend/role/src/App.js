import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import history from "./history";
import Pendingapprovel from "./home/pending-approvel";
import AdminHome from "./home/admin-Home";
import UserHome from "./home/user-Home";
import SellerHome from "./home/seller-Home";
import Auth from "./auth/auth";
import { ProtectRoute } from "./router/protectRoute";

const NoMatch = () => {
  return <div>404</div>;
};

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <ProtectRoute
            exact
            path="/admin"
            roles={["admin"]}
            component={AdminHome}
          />
          <ProtectRoute
            exact
            path="/user"
            roles={["user"]}
            component={UserHome}
          />
          <ProtectRoute
            exact
            path="/seller"
            roles={["seller"]}
            component={SellerHome}
          />
          <ProtectRoute
            exact
            roles={["pendingapprovel"]}
            path="/pendingapprovel"
            component={Pendingapprovel}
          />

          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
