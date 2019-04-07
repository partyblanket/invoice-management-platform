import React, {useState} from 'react'

function InvoiceItem({val, className}) {

  const [content, setContent] = useState(val)

  function onClick () {

  }

  return (
    <div className={className}>
      {val}
    </div>
  )
}

export default InvoiceItem
