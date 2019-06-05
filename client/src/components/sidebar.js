import React, {useState} from 'react'
import { connect } from 'react-redux';
import { setCurrentSale } from '../utils/actions';
import { Link } from "react-router-dom";


function Sidebar(props) { 

  const salesListItems = props.salesList.map(el => <Link key={el._id || 'none'} to={'/sale/'+el.invoiceid}>{el.invoiceid}</Link>)
  return (
    <div id='sidebar'>
      <div className={props.showSidebar ? 'menu visible' : 'menu'}>
        <b className='title'>invoices</b>
        <b className='new' onClick={() => props.dispatch(setCurrentSale(null))}>NEW</b>
        {salesListItems}
      </div>
      <div className='cover'></div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    showSidebar: state.showSidebar,
    salesList: state.salesList || [],
  };
};

export default connect(mapStateToProps)(Sidebar);