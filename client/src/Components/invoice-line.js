import React from 'react'
import Item from './Invoice-item';

function InvoiceLine({item, amount, value}) {
  return (
    <>
        <Item className='line_description line_item' val={item} />
        <Item className='line_amount line_item' val={amount} />
        <Item className='line_value line_item' val={value} />
        <Item className='line_total line_item' val={amount * value} />
    </>
  )
}

export default InvoiceLine
