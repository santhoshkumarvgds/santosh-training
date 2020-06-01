import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import history from "./history";
import Pendingapprovel from "./home/pending-approvel";
import AdminHome from "./home/admin-Home";
import UserHome from "./home/user-Home";
import SellerHome from "./home/seller-Home";

const NoMatch = (props) => {
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

          <Route
            exact
            path="/admin"
            render={() =>
              localStorage.redirect == "admin" ? (
                <AdminHome />
              ) : (
                <Redirect to={localStorage.redirect} />
              )
            }
          />
          <Route
            exact
            path="/user"
            render={() =>
              localStorage.redirect == "user" ? (
                <UserHome />
              ) : (
                <Redirect to={localStorage.redirect} />
              )
            }
          />
          <Route
            exact
            path="/seller"
            render={() =>
              localStorage.redirect == "seller" ? (
                <SellerHome />
              ) : (
                <Redirect to={localStorage.redirect} />
              )
            }
          />
          <Route
            exact
            path="/pendingapprovel"
            render={() =>
              localStorage.redirect == "pendingapprovel" ? (
                <Pendingapprovel />
              ) : (
                <Redirect to={localStorage.redirect} />
              )
            }
          />

          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
