import React, {useState} from 'react'
import Item from './Invoice-item'
import InvoiceLine from './Invoice-line';
import InvoiceAddress from './Invoice-address';

function Invoice({details}) {



  const items = details.lines.map(el => (
    <InvoiceLine item={el.item} amount={el.amount} value={el.value}/>
  ))

  return (
    <div className='pdf' id='pdf'>
    <div className='pdf_body'>
      <div className='pdf_content' id='pdf_head'>
        <Item contenteditable="true" className='pdf_item date' val={details.date}/>
        <Item className='pdf_item company' val={details.from.name} />
        <InvoiceAddress address={details.from.address} />

      </div>
      <div className='pdf_content' id='pdf_main'></div>
      <div className='pdf_content items'>
        {items}

      </div>
      <div className='pdf_content' id='pdf_foot'></div>
    </div>
  </div>
  )
}

export default Invoice
