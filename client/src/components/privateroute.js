import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = ({ username, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            username ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);


function mapStateToProps(state) {
    return {
      username: state.username,
    };
  };

export default connect(mapStateToProps)(PrivateRoute);