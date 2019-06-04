import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {  } from '../utils/actions';

import './list.css'



function List(props) {

  const items = props.salesList.map(el => {
    return (<div className='list-item'>me</div>)
  })

  return (
    <div className='list'>
      {items}
    </div>
  )
}





function mapStateToProps(state) {
  return {
    salesList: state.salesList || [],
  };
};

export default connect(mapStateToProps)(List);