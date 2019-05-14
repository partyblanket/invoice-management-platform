import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { postInvoice } from '../utils/actions';

let counter = 0

function Sale(props) {

  const invoiceDefault ={
    amount: 1,
    sku: '',
    price: '',
    description: '',
    vat: '20%'
  }
  
  const detsDefault = {
    billingName: '',
    billingPhone: '+49',
    billingAddressLineOne: '',
    billingAddressLineTwo: '',
    billingPostcode: '',
    billingCity: '',
    shippingName: '',
    shippingPhone: '',
    shippingAddressLineOne: '',
    shippingAddressLineTwo: '',
    shippingPostcode: '',
    shippingCity: '',
    shippingDate: '',
    invoiceDate: '',
    includingTax: true,
    paymentTerms: '',
    dueDate: '',
    currency: 'EUR',
    invoiceLines: [{...invoiceDefault}],
    privateNote: '',
    terms: '',
  }

  const [shippingRadio, setShippingRadio] = useState(false)

  const [dets, setDets] = useState(detsDefault)

  const changeHandler = (e, index) => {
    if(e.target.parentElement.classList.contains('line')){
      const newState = { ...dets}
      newState.invoiceLines[index][e.target.name] = e.target.value
      return setDets(newState)
    }
    if(['billingName','billingPhone','billingAddressLineOne','billingAddressLineTwo','billingPostcode','billingCity','shippingName', 'shippingPhone', 'shippingAddressLineOne', 'shippingAddressLineTwo', 'shippingPostcode', 'shippingCity', 'shippingDate'].includes(e.target.name)) {
      setShippingRadio(false)
    }
    const newState = { ...dets, [e.target.name]: e.target.value }
    setDets(newState)
  }

  const changeLine = (index) => {
    const newState = { ...dets}
    if(index > -1){
      newState.invoiceLines.splice(index,1)
    }else{
      newState.invoiceLines.push({...invoiceDefault})
    }
    return setDets(newState)
  }
  const copyBilling = () => {
    const newState = { ...dets}
    newState.shippingAddressLineOne = newState.billingAddressLineOne
    newState.shippingAddressLineTwo = newState.billingAddressLineTwo
    newState.shippingCity = newState.billingCity
    newState.shippingName = newState.billingName
    newState.shippingPhone = newState.billingPhone
    newState.shippingPostcode = newState.billingPostcode
    setShippingRadio(true)
    return setDets(newState)
  }
  useEffect(() => {

    console.log(++counter)
  })

  const invoiceLines = dets.invoiceLines.map((el, index) => {
    return (
      <div className='line' key={index}>
        <img alt='remove line'src='/minus.svg' style={{ height: '1.5rem' }} onClick={() => changeLine(index)}></img>
        <input type='number' name='amount' value={el.amount} onChange={(e) => changeHandler(e, index)}/>
        <input type='text' name='sku' value={el.sku} onChange={(e) => changeHandler(e, index)}/>
        <input type='text' name='price' value={el.price}  onChange={(e) => changeHandler(e, index)}/>
        <input type='text' name='description' value={el.description} onChange={(e) => changeHandler(e, index)}/>
        <input type='text' name='vat' value={el.vat} onChange={(e) => changeHandler(e, index)}/>
        <div>{Number.isNaN(el.amount * el.price)?'':el.amount * el.price}</div>
      </div>
    )
  })

  return (
    <div className='main'>
      <div className='head'><p>Invoice # 1234</p><div><div className='save button' onClick={(e) => props.dispatch(postInvoice(dets))}>SAVE</div></div></div>
      <div className='client-and-settings-container'>
        <div className='col1'>
          <p>Billing</p><p />
          <p>Name</p><input type='text' name='billingName' onChange={e => changeHandler(e)} value={dets.billingName} />
          <p>Phone</p><input type='text' name='billingPhone' onChange={e => changeHandler(e)} value={dets.billingPhone}></input>
          <p>Address Line 1</p><input type='text' name='billingAddressLineOne' onChange={e => changeHandler(e)} value={dets.billingAddressLineOne}></input>
          <p>Address Line 2</p><input type='text' name='billingAddressLineTwo' onChange={e => changeHandler(e)} value={dets.billingAddressLineTwo}></input>
          <p>Postcode</p><input type='text' name='billingPostcode' onChange={e => changeHandler(e)} value={dets.billingPostcode}></input>
          <p>City</p><input type='text' name='billingCity' onChange={e => changeHandler(e)} value={dets.billingCity}></input>

        </div>
        <div className='col2'>
          <p>Shipping</p><div style={{ display: 'flex', justifySelf: 'left', marginLeft: '2rem' }}><input type='radio' checked={shippingRadio} onChange={copyBilling}/><p>same as billing</p></div>
          <p>Name</p><input type='text' name='shippingName' onChange={e => changeHandler(e)} value={dets.shippingName} />
          <p>Phone</p><input type='text' name='shippingPhone' onChange={e => changeHandler(e)} value={dets.shippingPhone}></input>
          <p>Address Line 1</p><input type='text' name='shippingAddressLineOne' onChange={e => changeHandler(e)} value={dets.shippingAddressLineOne}></input>
          <p>Address Line 2</p><input type='text' name='shippingAddressLineTwo' onChange={e => changeHandler(e)} value={dets.shippingAddressLineTwo}></input>
          <p>Postcode</p><input type='text' name='shippingPostcode' onChange={e => changeHandler(e)} value={dets.shippingPostcode}></input>
          <p>City</p><input type='text' name='shippingCity' onChange={e => changeHandler(e)} value={dets.shippingCity}></input>

        </div>
        <div className='col3'>
          <p></p><div></div>
          <p>Shipping Date</p><input type='date' name='shippingDate' onChange={e => changeHandler(e)} value={dets.shippingDate} />
          <p>Invoice Date</p><input type='date' name='invoiceDate' onChange={e => changeHandler(e)} value={dets.invoiceDate}></input>
          <p>Due Date</p><input type='date' name='dueDate' onChange={e => changeHandler(e)} value={dets.dueDate}></input>
          <p>Currency</p><input type='text' name='currency' onChange={e => changeHandler(e)} value={dets.currency}></input>

        </div>
      </div>
      <div className='items'>
        <div className='line'>
          <img alt='add line' src='/plus.svg' style={{ height: '1.5rem' }} onClick={() => changeLine()} />
          <div>Amnt.</div>
          <div>SKU</div>
          <div>Unit price</div>
          <div>Item description</div>
          <div>VAT</div>
          <div>Total:</div>
        </div>
        {invoiceLines}
        <div className='note-total'>
          <p className='exvat'>Total ex. VAT:</p><p className='exvatamnt'>EUR 100</p>
          <p className='vat'>Total VAT:</p><p className='vatamnt'>EUR 10</p>
          <p className='incvat'>Total inv. VAT:</p><p className='incvatamnt'>EUR 110</p>
          {/* <textarea value={dets.privateNote} rows="4" cols="50" className='note' /> */}
        </div>


      </div>
      {/* <div className='terms'>Terms &amp; Conditions</div> */}
      
    </div>
  )
}

function mapStateToProps(state) {
  return {

  };
};

export default connect(mapStateToProps)(Sale);