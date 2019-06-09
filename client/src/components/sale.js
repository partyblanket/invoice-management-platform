import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { postInvoice, printInvoice, setCurrentSale } from '../utils/actions';
import * as DEFAULTS from '../utils/defaults'
import useForm from 'react-hook-form'


function Sale(props) {
  const [dets, setDets] = useState(null)
  const [shippingRadio, setShippingRadio] = useState(false)

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {...dets},
  })


  useEffect(() => {
    const invoiceid = props.match.params.id
    let sale = props.salesList.find(el => el.invoiceid == invoiceid)
    if(sale) {
      sale.invoiceLines.forEach((el,index) => {
        sale['line_'+Number(index+1)+'_amount'] = el.amount
        sale['line_'+Number(index+1)+'_sku'] = el.sku
        sale['line_'+Number(index+1)+'_description'] = el.description
        sale['line_'+Number(index+1)+'_price'] = el.price
        sale['line_'+Number(index+1)+'_vat'] = el.vat
      })
      props.dispatch(setCurrentSale(sale._id))
      setDets({...sale})
    }else{
      props.dispatch(setCurrentSale(null))
      sale = {...DEFAULTS.detsDefault}
      sale.invoiceLines.forEach((el,index) => {
        sale['line_'+Number(index+1)+'_amount'] = el.amount
        sale['line_'+Number(index+1)+'_sku'] = el.sku
        sale['line_'+Number(index+1)+'_description'] = el.description
        sale['line_'+Number(index+1)+'_price'] = el.price
        sale['line_'+Number(index+1)+'_vat'] = el.vat
      })

      setDets({...sale})
    }
  }, [props.salesList,props.match.params.id])

  if(!dets) return 'loading'

  const calcInvoiceTotals = () => {
    const invoiceTotals = {inc: 0,ex: 0,vat: 0 }
    dets.invoiceLines.forEach(el => {
      if (dets.incVat) {
        invoiceTotals.inc += el.amount * el.price
        invoiceTotals.ex += el.amount * el.price / ((el.vat / 100) + 1)
        invoiceTotals.vat += (el.amount * el.price / ((el.vat / 100) + 1)) * (el.vat / 100)
      } else {
        invoiceTotals.inc += el.amount * el.price * ((el.vat / 100) + 1);
        invoiceTotals.ex += el.amount * el.price;
        invoiceTotals.vat += el.amount * el.price * (el.vat / 100);
      }
    });
    
    return invoiceTotals
  }

  const changeHandler = (e, index) => {
    if (e.target.parentElement.classList.contains('line') || e.target.parentElement.parentElement.classList.contains('line')) {
      const newState = { ...dets }
      newState.invoiceLines[index][e.target.name] = e.target.value
      newState.invoiceTotals = {...calcInvoiceTotals()}
      return setDets(newState)
    }
    if (['billingName', 'billingPhone', 'billingAddressLineOne', 'billingAddressLineTwo', 'billingPostcode', 'billingCity', 'shippingName', 'shippingPhone', 'shippingAddressLineOne', 'shippingAddressLineTwo', 'shippingPostcode', 'shippingCity', 'shippingDate'].includes(e.target.name)) {
      setShippingRadio(false)
    }
    if (e.target.name === 'incVat') {
      const newState = { ...dets, incVat: e.target.checked }
      newState.invoiceTotals = {...calcInvoiceTotals()}
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

  const invoiceLinesElements = dets.invoiceLines.map((el, index) => {
    return (
      <div className='line' key={index}>
        <img alt='remove line' src='/icons/minus.svg' style={{ height: '1.5rem' }} onClick={() => changeLine(index)}></img>
        <input type='number' name={'line_'+Number(index+1)+'_amount'} ref={register({ required: 'field required' })} />
        <input type='text' name={'line_'+Number(index+1)+'_sku'} ref={register({ required: 'field required' })} />
        <input type='number' name={'line_'+Number(index+1)+'_price'} ref={register({ required: 'field required' })} />
        <input type='text' name={'line_'+Number(index+1)+'_description'} ref={register({ required: 'field required' })} />
        <div><input type='number' name={'line_'+Number(index+1)+'_vat'}ref={register({ required: 'field required' })} />%</div>
        <div>{Number.isNaN(el.amount * el.price) ? '' : el.amount * el.price}</div>
      </div>
    )
  }) 

  const onSubmit = data => { 
    console.log(data);
    
    // props.dispatch(postInvoice(props.userid, data, props.currentSale, props.nextSale))
  };

  const errorText = Object.keys(errors).map(key => <p key={'err'+key}>{key}: {errors[key].message}</p>)

  return (
  <div className='main'>
      {props.error && <div className='error'>{props.error}</div>}
      {errorText}
      <div className='head'>
        
        <p>Invoice # {dets.invoiceid}</p>
        <div>
          <input type='submit' value='SAVE' form='saleForm' id='save' className='button' />
          <div className='print button' onClick={(e) => props.dispatch(printInvoice(props.userid, dets, props.currentSale))}>Print</div>
          <div className='template button' onClick={(e) => props.dispatch(printInvoice(props.userid, dets, props.currentSale))}><img alt='template' src='/icons/email.svg' />
          </div>
        </div>
      </div>
      <form id='saleForm' onSubmit={handleSubmit(onSubmit)}>
      <div className='client-and-settings-container'>
        <div className='col1'>
          <p>Billing</p><p />
          <p>Company</p><input type='text' name='billingCompany' ref={register({ required: 'field required' })}/>
          <p>Name</p><input type='text' name='billingName' ref={register({ required: 'field required' })} />
          <p>Phone</p><input type='text' name='billingPhone' ref={register({ required: 'field required' })}></input>
          <p>Address Line 1</p><input type='text' name='billingAddressLineOne' ref={register({ required: 'field required' })}></input>
          <p>Address Line 2</p><input type='text' name='billingAddressLineTwo' ref={register}></input>
          <p>Postcode</p><input type='text' name='billingPostcode' ref={register}></input>
          <p>City</p><input type='text' name='billingCity' ref={register({ required: 'field required' })}></input>

        </div>
        <div className='col2'>
          <p>Shipping</p><div style={{ display: 'flex', justifySelf: 'left', marginLeft: '2rem' }}><input type='radio' checked={shippingRadio} onChange={copyBilling} /><p>same as billing</p></div>
          <p>Company</p><input type='text' name='shippingCompany' ref={register} />
          <p>Name</p><input type='text' name='shippingName' ref={register} />
          <p>Phone</p><input type='text' name='shippingPhone' ref={register}></input>
          <p>Address Line 1</p><input type='text' name='shippingAddressLineOne' ref={register}></input>
          <p>Address Line 2</p><input type='text' name='shippingAddressLineTwo' ref={register}></input>
          <p>Postcode</p><input type='text' name='shippingPostcode' ref={register}></input>
          <p>City</p><input type='text' name='shippingCity' ref={register}></input>

        </div>
        <div className='col3'>
          <p></p><div></div>
          <p>Status</p><select name='status' ref={register({ required: 'field required' })}><option name='draft'>Draft</option><option name='invoiced'>Invoiced</option><option name='paid'>Paid</option></select>
          <p>Shipping Date</p><input type='date' name='shippingDate' ref={register({ required: 'field required' })} />
          <p>Invoice Date</p><input type='date' name='invoiceDate' ref={register({ required: 'field required' })}></input>
          <p>Due Date</p><input type='date' name='dueDate' ref={register({ required: 'field required' })}></input>
          <p>Currency</p><input type='text' name='currency' ref={register({ required: 'field required' })}></input>
          <p>Including VAT</p><input type='checkbox' name='incVat' ref={register}></input>

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
        {invoiceLinesElements}
        <div className='note-total'>
          <div className='terms'>
            <div>Terms &amp; Conditions</div>
            <textarea name='terms' rows="5" cols="35" value={dets.terms} onChange={e => changeHandler(e)} />
          </div>
          <div className='total'>
            <p className='exvat'>Total ex. VAT:</p><p className='exvatamnt'>{dets.currency} {dets.invoiceTotals.ex.toFixed(2)}</p>
            <p className='vat'>Total VAT:</p><p className='vatamnt'>{dets.currency} {dets.invoiceTotals.vat.toFixed(2)}</p>
            <p className='incvat'>Total inv. VAT:</p><p className='incvatamnt'>{dets.currency} {dets.invoiceTotals.inc.toFixed(2)}</p>
          </div>
        </div>
        <div className='note'>
          <div>Note:</div>
          <textarea name='privateNote' value={dets.privateNote} rows="5" cols="80" onChange={e => changeHandler(e)} />
        </div>
      </div>
      </form>
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
    error: state.error,
  };
};

export default connect(mapStateToProps)(Sale);