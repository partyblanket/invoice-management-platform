import React from 'react'
import { connect } from 'react-redux';
import {  } from '../utils/actions';
import Sale from './sale';
import Login from './login';
import Settings from './settings';

 

function Main(props) {
  if(!props._id) return <Login/>
  if(props.showSettings) return <Settings/>

  return (
    <>
      <Sale/>
    </>
  )
}


function mapStateToProps(state) {
  return {
    _id: state._id,
    showSettings: state.showSettings,
  };
};

export default connect(mapStateToProps)(Main);