import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {  } from '../utils/actions';


const activeItems = ['first']

const settingsItems = {
  first: {name: 'First Name'}
}





function Settings() {

  const [settings, setSettings] = useState({})

  return (
    <div id='settings'>
      <div id='category'>
        <div>General</div>
      </div>
      <div id='items'>
        {activeItems.map(el => (<>
          <div>{settingsItems[el].name}</div><input type='text'></input>
        </>))}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {

  };
};

export default connect(mapStateToProps)(Settings);