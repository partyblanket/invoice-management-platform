import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { postInvoice, getInvoice, printInvoice, setCurrentSale } from '../utils/actions';
import * as DEFAULTS from '../utils/defaults'

function Sale(props) {

  useEffect(() => {
    const invoiceid = props.match.params
    const sale = props.salesList.find(el => el.invoiceid === invoiceid)
    if(sale) {
      props.dispatch(setCurrentSale(sale._id))
    }
  }, [])

  // useEffect(() => {
  //   return () => {
  //     effect
  //   };
  // }, [input])

  useEffect(() => {
    if (props.currentSale === null) return setDets(DEFAULTS.detsDefault)
    props.dispatch(getInvoice(props.userid, props.currentSale))
  }, [props.currentSale])

  // useEffect(() => {
  //   props.sales[props.currentSale] && setDets(props.sales[props.currentSale])
  // }, [props.sales])


  const invoiceTotals = {
    vat: 0,
    ex: 0,
    inc: 0
  }

  const [shippingRadio, setShippingRadio] = useState(false)

  const [dets, setDets] = useState(null)

  const changeHandler = (e, index) => {
    if (e.target.parentElement.classList.contains('line') || e.target.parentElement.parentElement.classList.contains('line')) {
      const newState = { ...dets }
      newState.invoiceLines[index][e.target.name] = e.target.value
      return setDets(newState)
    }
    if (['billingName', 'billingPhone', 'billingAddressLineOne', 'billingAddressLineTwo', 'billingPostcode', 'billingCity', 'shippingName', 'shippingPhone', 'shippingAddressLineOne', 'shippingAddressLineTwo', 'shippingPostcode', 'shippingCity', 'shippingDate'].includes(e.target.name)) {
      setShippingRadio(false)
    }
    if (e.target.name === 'incVat') {
      const newState = { ...dets, incVat: e.target.checked }
      return setDets(newState)
    }
    const newState = { ...dets, [e.target.name]: e.target.value }
    setDets(newState)
  }

  const changeLine = (index) => {
    const newState = { ...dets }
    if (index > -1) {
      newState.invoiceLines.splice(index, 1)
    } else {
      newState.invoiceLines.push({ ...DEFAULTS.invoiceDefault })
    }
    return setDets(newState)
  }

  const copyBilling = () => {
    const newState = { ...dets }
    newState.shippingAddressLineOne = newState.billingAddressLineOne
    newState.shippingAddressLineTwo = newState.billingAddressLineTwo
    newState.shippingCity = newState.billingCity
    newState.shippingName = newState.billingName
    newState.shippingPhone = newState.billingPhone
    newState.shippingPostcode = newState.billingPostcode
    newState.shippingCompany = newState.billingCompany
    
    setShippingRadio(true)
    return setDets(newState)
  }

  if(!dets) return null

  const invoiceLines = dets.invoiceLines.map((el, index) => {
    if (dets.incVat) {
      invoiceTotals.inc += el.amount * el.price
      invoiceTotals.ex += el.amount * el.price / ((el.vat / 100) + 1)
      invoiceTotals.vat += (el.amount * el.price / ((el.vat / 100) + 1)) * (el.vat / 100)
    } else {
      invoiceTotals.inc += el.amount * el.price * ((el.vat / 100) + 1);
      invoiceTotals.ex += el.amount * el.price;
      invoiceTotals.vat += el.amount * el.price * (el.vat / 100);
    }

    return (
      <div className='line' key={index}>
        <img alt='remove line' src='/icons/minus.svg' style={{ height: '1.5rem' }} onClick={() => changeLine(index)}></img>
        <input type='number' name='amount' value={el.amount} onChange={(e) => changeHandler(e, index)} />
        <input type='text' name='sku' value={el.sku} onChange={(e) => changeHandler(e, index)} />
        <input type='number' name='price' value={el.price} onChange={(e) => changeHandler(e, index)} />
        <input type='text' name='description' value={el.description} onChange={(e) => changeHandler(e, index)} />
        <div><input type='number' name='vat' value={el.vat} onChange={(e) => changeHandler(e, index)} />%</div>
        <div>{Number.isNaN(el.amount * el.price) ? '' : el.amount * el.price}</div>
      </div>
    )
  })

  

  return (
    <div className='main'>
      <div className='head'>
        <p>Invoice # {dets.invoiceid}</p>
        <div>
          <div id='save' className='button' onClick={(e) => props.dispatch(postInvoice(props.userid, dets, props.currentSale, props.nextSale,invoiceTotals))}>SAVE</div>
          <div className='print button' onClick={(e) => props.dispatch(printInvoice(props.userid, dets, props.currentSale))}>Print</div>
          <div className='template button' onClick={(e) => props.dispatch(printInvoice(props.userid, dets, props.currentSale))}><img alt='template' src='/icons/email.svg' />
          </div>
        </div>
      </div>
      <div className='client-and-settings-container'>
        <div className='col1'>
          <p>Billing</p><p />
          <p>Company</p><input type='text' name='billingCompany' onChange={e => changeHandler(e)} value={dets.billingCompany} />
          <p>Name</p><input type='text' name='billingName' onChange={e => changeHandler(e)} value={dets.billingName} />
          <p>Phone</p><input type='text' name='billingPhone' onChange={e => changeHandler(e)} value={dets.billingPhone}></input>
          <p>Address Line 1</p><input type='text' name='billingAddressLineOne' onChange={e => changeHandler(e)} value={dets.billingAddressLineOne}></input>
          <p>Address Line 2</p><input type='text' name='billingAddressLineTwo' onChange={e => changeHandler(e)} value={dets.billingAddressLineTwo}></input>
          <p>Postcode</p><input type='text' name='billingPostcode' onChange={e => changeHandler(e)} value={dets.billingPostcode}></input>
          <p>City</p><input type='text' name='billingCity' onChange={e => changeHandler(e)} value={dets.billingCity}></input>

        </div>
        <div className='col2'>
          <p>Shipping</p><div style={{ display: 'flex', justifySelf: 'left', marginLeft: '2rem' }}><input type='radio' checked={shippingRadio} onChange={copyBilling} /><p>same as billing</p></div>
          <p>Company</p><input type='text' name='shippingCompany' onChange={e => changeHandler(e)} value={dets.shippingCompany} />
          <p>Name</p><input type='text' name='shippingName' onChange={e => changeHandler(e)} value={dets.shippingName} />
          <p>Phone</p><input type='text' name='shippingPhone' onChange={e => changeHandler(e)} value={dets.shippingPhone}></input>
          <p>Address Line 1</p><input type='text' name='shippingAddressLineOne' onChange={e => changeHandler(e)} value={dets.shippingAddressLineOne}></input>
          <p>Address Line 2</p><input type='text' name='shippingAddressLineTwo' onChange={e => changeHandler(e)} value={dets.shippingAddressLineTwo}></input>
          <p>Postcode</p><input type='text' name='shippingPostcode' onChange={e => changeHandler(e)} value={dets.shippingPostcode}></input>
          <p>City</p><input type='text' name='shippingCity' onChange={e => changeHandler(e)} value={dets.shippingCity}></input>

        </div>
        <div className='col3'>
          <p></p><div></div>
          <p>Status</p><select name='status' onChange={e => changeHandler(e)} value={dets.status}><option name='draft'>Draft</option><option name='invoiced'>Invoiced</option><option name='paid'>Paid</option></select>
          <p>Shipping Date</p><input type='date' name='shippingDate' onChange={e => changeHandler(e)} value={dets.shippingDate} />
          <p>Invoice Date</p><input type='date' name='invoiceDate' onChange={e => changeHandler(e)} value={dets.invoiceDate}></input>
          <p>Due Date</p><input type='date' name='dueDate' onChange={e => changeHandler(e)} value={dets.dueDate}></input>
          <p>Currency</p><input type='text' name='currency' onChange={e => changeHandler(e)} value={dets.currency}></input>
          <p>Including VAT</p><input type='checkbox' checked={dets.incVat} name='incVat' onChange={e => changeHandler(e)}></input>

        </div>
      </div>
      <div className='items'>
        <div className='line'>
          <img alt='add line' src='/icons/plus.svg' style={{ height: '1.5rem' }} onClick={() => changeLine()} />
          <div>Amnt.</div>
          <div>SKU</div>
          <div>Unit price</div>
          <div>Item description</div>
          <div>VAT</div>
          <div>Total:</div>
        </div>
        {invoiceLines}
        <div className='note-total'>
          <div className='terms'>
            <div>Terms &amp; Conditions</div>
            <textarea name='terms' rows="5" cols="35" value={dets.terms} onChange={e => changeHandler(e)} />
          </div>
          <div className='total'>
            <p className='exvat'>Total ex. VAT:</p><p className='exvatamnt'>{dets.currency} {invoiceTotals.ex.toFixed(2)}</p>
            <p className='vat'>Total VAT:</p><p className='vatamnt'>{dets.currency} {invoiceTotals.vat.toFixed(2)}</p>
            <p className='incvat'>Total inv. VAT:</p><p className='incvatamnt'>{dets.currency} {invoiceTotals.inc.toFixed(2)}</p>
          </div>
        </div>
        <div className='note'>
          <div>Note:</div>
          <textarea name='privateNote' value={dets.privateNote} rows="5" cols="80" onChange={e => changeHandler(e)} />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sale: state.sale,
    currentSale: state.currentSale || null,
    sales: state.sales || {},
    userid: state.userid,
    nextSale: state.nextSale,
    status: state.status,
    salesList: state.salesList || [],
  };
};

export default connect(mapStateToProps)(Sale);