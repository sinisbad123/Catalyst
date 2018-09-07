import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Login from "../components/login/index";
import Home from "../components/home/index";
import Splash from "../components/splash/index";
import Dashboard from "../components/dashboard/index";
import Orders from "../components/orders/index";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

const RouteHandler = (props) => (
  <Router>
    <Switch>
      {(props.state.requestingRestore || props.state.requestingAuth) && (<Splash />)}
      <PrivateRoute exact path="/" component={Dashboard} state={props.state} />
      <PrivateRoute path="/orders" component={Orders} state={props.state} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

const PrivateRoute = ({ component: Component, ...rest, state }) => (
  <Route
    {...rest}
    render={props =>
      state.isAuth ? (
        <Home>
         <Component />
        </Home>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)


export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(RouteHandler);
