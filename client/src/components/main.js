import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {  } from '../utils/actions';
import Sale from './sale';
import Login from './login';

 

function Main(props) {
  return (
    props.userid ? <Sale/> : <Login/>
  )
}


function mapStateToProps(state) {
  return {
    userid: state.userid,
  };
};

export default connect(mapStateToProps)(Main);