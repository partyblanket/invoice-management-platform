import React from 'react'
import Item from './Invoice-item';

function InvoiceLine({item, amount, value}) {
  return (
    <>
        <Item contenteditable="true" className='line_description line_item' val={item} />
        <Item contenteditable="true" className='line_amount line_item' val={amount} />
        <Item contenteditable="true" className='line_value line_item' val={value} />
        <Item contenteditable="true" className='line_total line_item' val={amount * value} />
    </>
  )
}

export default InvoiceLine
