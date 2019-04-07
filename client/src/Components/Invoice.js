import React, {useState} from 'react'
import Item from './Invoice-item'
import InvoiceLine from './invoice-line';

function Invoice() {

  const INVOICE_DEFAULTS = {
    from: {
      name: 'Company Name',
    },
    to: {},
    lines: [
      {
        item: 'an item',
        amount: 3,
        value: 4.5,
      },
      {
        item: 'item two',
        amount: 5,
        value: 5.5,
      },
      {
        item: 'item three',
        amount: 5,
        value: 5.5,
      },
      {
        item: 'item four',
        amount: 5,
        value: 5.5,
      },
      {
        item: 'item fve',
        amount: 5,
        value: 5.5,
      },
      {
        item: 'item six',
        amount: 5,
        value: 5.54,
      },
    ],
    date: '12 April 2019',
    locale: '',
    currency: 'EUR',
  }

  const [invDets, setInvDets] = useState(INVOICE_DEFAULTS)

  const items = invDets.lines.map(el => (
    <InvoiceLine item={el.item} amount={el.amount} value={el.value}/>
  ))

  return (
    <div className='pdf' id='pdf'>
    <div className='pdf_body'>
      <div className='pdf_content' id='pdf_head'>
        <Item className='pdf_item date' val={invDets.date}/>
        <Item className='pdf_item company' val={invDets.from.name} >
          <div className='pdf_item' id='address'>
            <p>Slotenmakerstraat 33</p>
            <p>1901 SB Beverwijk</p>
            <p>The Netherlands</p>
          </div>
        </Item>

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
