import React from 'react'
import { connect } from 'react-redux';
import { toggleSettings } from '../utils/actions';

function Header(props) {
  return (
    <header>
      <div>Create Invoice App</div>
      <img alt='' className='settings' src='/settings.svg' onClick={() => props.dispatch(toggleSettings())}/>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    showSettings: state.showSettings
  };
};

export default connect(mapStateToProps)(Header);