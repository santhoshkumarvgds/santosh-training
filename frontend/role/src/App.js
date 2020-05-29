import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import history from "./history";
import Pendingapprovel from "./home/pending-approvel";
import UserHome from "./home/user-Home";

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
          {/* <Route exact path="/userhome">
            <Redirect to="/user" />
          </Route> */}
          <Route
            exact
            path="/pendingapprovel"
            render={() =>
              localStorage.role == "User" ? (
                <Redirect to="/user" />
              ) : localStorage.role == "Seller" ? (
                <Pendingapprovel />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/user"
            render={() =>
              localStorage.role == "User" ? (
                <UserHome />
              ) : localStorage.role == "Seller" ? (
                <Redirect to="/pendingapprovel" />
              ) : (
                <Redirect to="/" />
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
