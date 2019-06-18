import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { Link} from "react-router-dom";

import './list.css'

function List(props) {

  useEffect(() => {
      const sale = props.salesList.find(el => el._id == props.currentSale)
      if(sale){
        props.history.push('/sale/'+sale.invoiceid)
      }    
  }, [props.currentSale])
  
  const items = props.salesList.map(el => {
    return (
    <Link to={'/sale/'+el.invoiceid} className='list-item' key={el._id}>
        <p>{el.invoiceid}</p>
        <p>{el.invoiceDate}</p>
        <p>{el.dueDate}</p>
        <p>{el.billingCompany}</p>
        <p>{el.totalIncVat}</p>
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
    currentSale: state.currentSale,
  };
};

export default connect(mapStateToProps)(List);