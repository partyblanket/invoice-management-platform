import React, { useState, useEffect } from 'react'

export default function Main() {

  const invoiceDefault ={
    amount: 1,
    sku: '',
    price: 0,
    description: '',
    VAT: '20%',
    total: 0

  }
  
  const detsDefault = {
    BillingName: '',
    BillingPhone: '+49',
    BillingAddressLineOne: '',
    BillingAddressLineTwo: '',
    BillingPostcode: '',
    BillingCity: '',
    ShippingName: '',
    ShippingPhone: '',
    ShippingBillingAddressLineOne: '',
    ShippingBillingAddressLineTwo: '',
    ShippingBillingPostcode: '',
    ShippingBillingCity: '',
    ShippingDate: '',
    InvoiceDate: '',
    IncludingTax: true,
    DueDate: '',
    Currency: 'EUR',
    invoiceLines: [invoiceDefault]
  }



  const [dets, setDets] = useState(detsDefault)



  const [invoiceDets, setInvoiceDets] = useState([])


  const changeHandler = (e, index) => {
    const prevState = { ...dets }
    const newState = { ...prevState, [e.target.name]: e.target.value }
    setDets(newState)
  }

  useEffect(() => {
    console.log(dets);

  })

  const invoiceLines = dets.invoiceLines.map((el, index) => {
    console.log(el);
    
    return (
      <>
      <img src='/minus.svg' style={{ height: '1.5rem' }}></img>
      <input type='text' name='amount' value={el.amount} onChange={(e, index) => changeHandler(e)}/>
      <input type='text' name='sku' value={el.sku}></input>
      <input type='text' name='price' value={el.price} />
      <input type='text' name='description' value={el.description}></input>
      <input type='text' name='vat' value={el.vat}></input>
      <div>{el.amount * el.price}</div>
      </>
    )
  })

  return (
    <div className='main'>
      <h4>Invoice # 1234</h4>
      <div className='client-and-settings-container'>
        <div className='col1'>
          <p>Billing</p><p />
          <p>Name</p><input type='text' name='BillingName' onChange={e => changeHandler(e)} value={dets.BillingName} />
          <p>Phone</p><input type='text' name='BillingPhone' onChange={e => changeHandler(e)} value={dets.BillingPhone}></input>
          <p>Address Line 1</p><input type='text' name='BillingAddressLineOne' onChange={e => changeHandler(e)} value={dets.BillingAddressLineOne}></input>
          <p>Address Line 2</p><input type='text' name='BillingAddressLineTwo' onChange={e => changeHandler(e)} value={dets.BillingAddressLineTwo}></input>
          <p>Postcode</p><input type='text' name='BillingPostcode' onChange={e => changeHandler(e)} value={dets.BillingPostcode}></input>
          <p>City</p><input type='text' name='BillingCity' onChange={e => changeHandler(e)} value={dets.BillingCity} value={dets.BillingCity}></input>

        </div>
        <div className='col2'>
          <p>Shipping</p><div style={{ display: 'flex', justifySelf: 'left', marginLeft: '2rem' }}><input type='radio' /><p>same as billing</p></div>
          <p>Name</p><input type='text' name='ShippingName' onChange={e => changeHandler(e)} value={dets.ShippingName} />
          <p>Phone</p><input type='text' name='ShippingPhone' onChange={e => changeHandler(e)} value={dets.ShippingPhone}></input>
          <p>Address Line 1</p><input type='text' name='ShippingAddressLineOne' onChange={e => changeHandler(e)} value={dets.ShippingAddressLineOne}></input>
          <p>Address Line 2</p><input type='text' name='ShippingAddressLineTwo' onChange={e => changeHandler(e)} value={dets.ShippingAddressLineTwo}></input>
          <p>Postcode</p><input type='text' name='ShippingPostcode' onChange={e => changeHandler(e)} value={dets.ShippingPostcode}></input>
          <p>City</p><input type='text' name='ShippingCity' onChange={e => changeHandler(e)} value={dets.ShippingCity}></input>

        </div>
        <div className='col3'>
          <p></p><div></div>
          <p>Shipping Date</p><input type='date' name='ShippingDate' onChange={e => changeHandler(e)} value={dets.ShippingDate} />
          <p>Invoice Date</p><input type='date' name='InvoiceDate' onChange={e => changeHandler(e)} value={dets.InvoiceDate}></input>
          <p>Due Date</p><input type='date' name='DueDate' onChange={e => changeHandler(e)} value={dets.DueDate}></input>
          <p>Currency</p><input type='text' name='currency' onChange={e => changeHandler(e)} value={dets.Currency}></input>

        </div>
      </div>
      <div className='items'>
        <img src='/plus.svg' style={{ height: '1.5rem' }}></img>
        <div>Amnt.</div>
        <div>SKU</div>
        <div>Unit price</div>
        <div>Item description</div>
        <div>VAT</div>
        <div>Total:</div>
        {invoiceLines}
        <img src='/minus.svg' style={{ height: '1.5rem' }}></img>
        <input type='text' name='amount' value='1' />
        <input type='text' name='sku' value='30.455'></input>
        <input type='text' name='price' value='1' />
        <input type='text' name='description' value='Great Iten '></input>
        <input type='text' name='vat'></input>
        <div>$10,00</div>
        <img src='/minus.svg' style={{ height: '1.5rem' }}></img>
        <input type='text' className='amount' value='1' />
        <input type='text' className='sku' value='30.455'></input>
        <input type='text' className='item' value='Great Iten '></input>
        <input className='item'></input>
        <div>$10,00</div>
        <img src='/minus.svg' style={{ height: '1.5rem' }}></img>
        <input type='text' className='amount' value='1' />
        <input type='text' className='sku' value='30.455'></input>
        <input type='text' className='item' value='Great Iten '></input>
        <input className='item'></input>
        <div>$10,00</div>


      </div>
      <div className='terms'>Terms %20 Conditions</div>
      <div className='note'>This will be a note</div>
    </div>
  )
}
