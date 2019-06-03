import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { isLoggedIn } from '../utils/actions';
import Sale from './sale';
import Login from './login';
import Settings from './settings';

function Main(props) {

  useEffect(() => {
    props.dispatch(isLoggedIn());
  },[])

  if(!props.userid) return <Login/>
  if(props.showSettings) return <Settings/>

  return (
    <>
      <Sale/>
    </>
  )
}

function mapStateToProps(state) {
  return {
    userid: state.userid,
    showSettings: state.showSettings,
  };
};

export default connect(mapStateToProps)(Main);
