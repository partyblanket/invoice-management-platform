import React from 'react'

function InvoiceAddress({address}) {
  console.log(address);
  
  const addressP = address.map(line => (
    <p>{line}</p>
  ))

  return (
    <div className='pdf_item address'>
      {addressP}
    </div>
  )
}

export default InvoiceAddress
