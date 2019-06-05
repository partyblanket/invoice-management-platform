import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { setCurrentSale } from '../utils/actions';
import { Link } from "react-router-dom";

import './list.css'



function List(props) {

  const items = props.salesList.map(el => {
    return (
    <Link to={'/sale/'+el.invoiceid} className='list-item' key={el._id}>
        <p>{el.invoiceid}</p>
        <p>{el.invoiceDate}</p>
        <p>{el.dueDate}</p>
        <p>{el.billingCompany}</p>
        <p>{el.invoiceTotals.ex}</p>
        <p>{el.status || 'draft'}</p>
    </Link>
    )
  })

  return (
    
      <>
        <div className='list-item'>
          <p>#</p>
          <p>Invoice date</p>
          <p>Due date</p>
          <p>Client</p>
          <p>Total</p>
          <p>Status</p>
        </div>
        {items}
      </>
    
  )
}





function mapStateToProps(state) {
  return {
    salesList: state.salesList || [],
  };
};

export default connect(mapStateToProps)(List);