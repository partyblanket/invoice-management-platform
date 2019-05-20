import React from 'react'
import { connect } from 'react-redux';
import { toggleSettings, toggleSidebar } from '../utils/actions';

function Header(props) {
  return (
    <header>
      <img alt='edit' className='edit' src='/edit.svg' onClick={() => props.dispatch(toggleSidebar())}/>
      <div className='title'>Invoice Builder</div>
      <img alt='settings' className='settings' src='/settings.svg' onClick={() => props.dispatch(toggleSettings())}/>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    showSettings: state.showSettings,
    showSidebar: state.showSidebar,

  };
};

export default connect(mapStateToProps)(Header);