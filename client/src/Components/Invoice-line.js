import React from 'react'
import Item from './Invoice-item';

function InvoiceLine({item, amount, value, invDets, setInvDets, index}) {
  return (
    <>
        <Item contenteditable="true" className='line_description line_item' val={item} invDets setInvDets index/>
        <Item contenteditable="true" className='line_amount line_item' val={amount} invDets setInvDets index/>
        <Item contenteditable="true" className='line_value line_item' val={value} invDets setInvDets index/>
        <Item contenteditable="false" className='line_total line_item' val={amount * value} />
    </>
  )
}

export default InvoiceLine
