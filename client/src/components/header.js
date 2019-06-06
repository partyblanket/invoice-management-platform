import React from 'react'
import { connect } from 'react-redux';
import { toggleSettings, toggleSidebar } from '../utils/actions';
import {Link} from 'react-router-dom'

function Header(props) {
  return (
    <header>
      <img alt='edit' className='edit' src='/icons/edit.svg' onClick={() => props.dispatch(toggleSidebar())}/>
      <div className='title'>Invoice Builder</div>
      <Link to='/settings'><img alt='settings' className='settings' src='/icons/settings.svg' onClick={() => props.dispatch(toggleSettings())}/></Link>
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