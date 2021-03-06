import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { isLoggedIn } from '../utils/actions';
import { BrowserRouter, Route } from "react-router-dom";

import Sale from './sale';
import PrivateRoute from "./privateroute";
import Login from './login';
import Settings from './settings';
import List from './list'
import Header from './header'
import Sidebar from './sidebar'
import Templates from './templates'

function Main(props) {
 
  useEffect(() => {
    props.dispatch(isLoggedIn());
  },[])

  return (
    <BrowserRouter>
      <>
        <Header />
        <Sidebar />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={List} />
        <PrivateRoute exact path='/sale/:id' component={Sale} />
        <PrivateRoute exact path='/list' component={List} />
        <PrivateRoute exact path='/settings' component={Settings} />
        <PrivateRoute exact path='/templates' component={Templates} />
        

      </>
    </BrowserRouter>
  )
}

function mapStateToProps(state) {
  return {
    username: state.username,
    userid: state.userid,
    showSettings: state.showSettings,
  };
};

export default connect(mapStateToProps)(Main);