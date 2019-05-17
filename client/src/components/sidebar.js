import React from 'react'
import { connect } from 'react-redux';
import { setCurrentSale } from '../utils/actions';

function Sidebar(props) {
  const salesList = props.salesIdArray.map(el => <p key={el || 'none'} onClick={() => props.dispatch(setCurrentSale(el))}>{el}</p>)
  return (
    <div id='sidebar'>
      <div className={props.showSidebar ? 'menu visible' : 'menu'}>
        <b className='title'>invoices</b>
        <b className='new' onClick={() => props.dispatch(setCurrentSale(null))}>NEW</b>
        {salesList}

      </div>
      <div className='cover'></div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    showSidebar: state.showSidebar,
    salesIdArray: state.salesIdArray || [],
  };
};

export default connect(mapStateToProps)(Sidebar);