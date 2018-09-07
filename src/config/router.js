import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Login from "../components/login/index";
import Protected from "../components/home/index";
import Splash from "../components/splash/index";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

const RouteHandler = (props) => (
  <Router>
    <Switch>
      {(props.state.requestingRestore || props.state.requestingAuth) && (<Splash {...props} />)}
      <PrivateRoute exact path="/" component={Protected} state={props.state} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

const PrivateRoute = ({ component: Component, ...rest, state }) => (
  <Route
    {...rest}
    render={props =>
      state.isAuth ? (
        <Component {...props} />
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
