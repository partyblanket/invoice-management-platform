import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { postSale, printInvoice, setCurrentSale } from '../utils/actions';
import * as DEFAULTS from '../utils/defaults'
import useForm from 'react-hook-form'
import { Redirect } from "react-router-dom";



function Sale(props) {
  const [dets, setDets] = useState(null)
  const [shippingRadio, setShippingRadio] = useState(false)
  const [totals, setTotals] = useState({inc:0,ex:0,vat:0})

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  // useEffect(() => {
  //   if(!currentSale) return
  //   setDets()
  // },[props.currentSale])

  useEffect(() => {
    if(!dets) return
    setTotals(calcTotals(dets.invoiceLines,dets.incVat))
  },[dets])



  useEffect(() => {
    const invoiceid = props.match.params.id
    let sale = props.salesList.find(el => el.invoiceid === Number(invoiceid))
    if(!sale){
      setDets({invoiceid: null})
    }else{
      setDets({...sale})
      props.dispatch(setCurrentSale(sale._id))
    }

  }, [props.salesList,props.match.params.id]) 

  if(!dets) return 'loading'
  if(dets.invoiceid === null) return <Redirect to='/list' />

  const changeHandler = (e) => {
    if (['billingName', 'billingPhone', 'billingAddressLineOne', 'billingAddressLineTwo', 'billingPostcode', 'billingCity', 'shippingName', 'shippingPhone', 'shippingAddressLineOne', 'shippingAddressLineTwo', 'shippingPostcode', 'shippingCity', 'shippingDate'].includes(e.target.name)) {
      setShippingRadio(false)
    }
    if (e.target.name === 'incVat') {
      const newState = { ...dets, incVat: e.target.checked }
      return setDets(newState)
    }
    if(e.target.name.includes('line_')){
      const splitItem = e.target.name.split('_')
      const line = Number(splitItem[1])-1
      const newInvoiceLines = [...dets.invoiceLines]
      newInvoiceLines[line][splitItem[2]] = e.target.value
      return setDets({ ...dets, invoiceLines: newInvoiceLines })
    }
    setDets({ ...dets, [e.target.name]: e.target.value })
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
        <input onChange={changeHandler} type='number' value={el.amount} name={'line_'+Number(index+1)+'_amount'} ref={register({ required: 'field required' })} />
        <input onChange={changeHandler} type='text'  value={el.sku} name={'line_'+Number(index+1)+'_sku'} ref={register({ required: 'field required' })}/>
        <input onChange={changeHandler} type='number'  value={el.price}name={'line_'+Number(index+1)+'_price'} ref={register({ required: 'field required' })} />
        <input onChange={changeHandler} type='text'  value={el.description} name={'line_'+Number(index+1)+'_description'} ref={register({ required: 'field required' })} />
        <div><input onChange={changeHandler} type='number' value={el.vat} name={'line_'+Number(index+1)+'_vat'}ref={register({ required: 'field required' })}/>%</div>
        <div>{Number(el.amount * el.price).toFixed(2)}</div>
      </div>
    )
  }) 

  const onSubmit = data => { 
    console.log('onSubmit ',data);
    props.dispatch(postSale(props.userid, data, props.currentSale, totals))
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
          <p>Company</p><input onChange={changeHandler} value={dets.billingCompany} type='text' name='billingCompany' ref={register({ required: 'field required' })}/>
          <p>Name</p><input onChange={changeHandler} value={dets.billingName} type='text' name='billingName' ref={register({ required: 'field required' })} />
          <p>Phone</p><input onChange={changeHandler} value={dets.billingPhone} type='text' name='billingPhone' ref={register({ required: 'field required' })}></input>
          <p>Address Line 1</p><input  onChange={changeHandler} value={dets.billingAddressLineOne} type='text' name='billingAddressLineOne' ref={register({ required: 'field required' })}></input>
          <p>Address Line 2</p><input  onChange={changeHandler} value={dets.billingAddressLineTwo} type='text' name='billingAddressLineTwo' ref={register}></input>
          <p>Postcode</p><input  onChange={changeHandler} value={dets.billingPostcode} type='text' name='billingPostcode' ref={register}></input>
          <p>City</p><input  onChange={changeHandler} value={dets.billingCity} type='text' name='billingCity' ref={register({ required: 'field required' })}></input>

        </div>
        <div className='col2'>
          <p>Shipping</p><div style={{ display: 'flex', justifySelf: 'left', marginLeft: '2rem' }}><input type='radio' checked={shippingRadio} onChange={copyBilling} /><p>same as billing</p></div>
          <p>Company</p><input onChange={changeHandler} value={dets.shippingCompany} type='text' name='shippingCompany' ref={register} />
          <p>Name</p><input onChange={changeHandler} value={dets.shippingName} type='text' name='shippingName' ref={register} />
          <p>Phone</p><input onChange={changeHandler} value={dets.shippingPhone} type='text' name='shippingPhone' ref={register}></input>
          <p>Address Line 1</p><input onChange={changeHandler} value={dets.shippingAddressLineOne} type='text' name='shippingAddressLineOne' ref={register}></input>
          <p>Address Line 2</p><input onChange={changeHandler} value={dets.shippingAddressLineTwo} type='text' name='shippingAddressLineTwo' ref={register}></input>
          <p>Postcode</p><input onChange={changeHandler} value={dets.shippingPostcode} type='text' name='shippingPostcode' ref={register}></input>
          <p>City</p><input onChange={changeHandler} value={dets.shippingCity} type='text' name='shippingCity' ref={register}></input>

        </div>
        <div className='col3'>
          <p></p><div></div>
          <p>Status</p><select onChange={changeHandler} value={dets.status} name='status' ref={register({ required: 'field required' })}><option name='draft'>Draft</option><option name='invoiced'>Invoiced</option><option name='paid'>Paid</option></select>
          <p>Shipping Date</p><input onChange={changeHandler} value={dets.shippingDate} type='date' name='shippingDate' ref={register({ required: 'field required' })} />
          <p>Invoice Date</p><input onChange={changeHandler} value={dets.invoiceDate} type='date' name='invoiceDate' ref={register({ required: 'field required' })}></input>
          <p>Due Date</p><input onChange={changeHandler} value={dets.dueDate} type='date' name='dueDate' ref={register({ required: 'field required' })}></input>
          <p>Currency</p><input onChange={changeHandler} value={dets.currency} type='text' name='currency' ref={register({ required: 'field required' })}></input>
          <p>Including VAT</p><input onChange={changeHandler} value={dets.incVat} type='checkbox' name='incVat' ref={register}></input>

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
        {dets.invoiceLines && invoiceLinesElements}
        <div className='note-total'>
          <div className='terms'>
            <div>Terms &amp; Conditions</div>
            <textarea name='terms' rows="5" cols="35" value={dets.terms} onChange={changeHandler} ref={register} />
          </div>
          <div className='total'>
            <p className='exvat'>Total ex. VAT:</p><p className='exvatamnt'>{dets.currency} {totals.ex}</p>
            <p className='vat'>Total VAT:</p><p className='vatamnt'>{dets.currency} {totals.vat}</p>
            <p className='incvat'>Total inv. VAT:</p><p className='incvatamnt'>{dets.currency} {totals.inc}</p>
          </div>
        </div>
        <div className='note'>
          <div>Note:</div>
          <textarea name='privateNote' value={dets.privateNote} rows="5" cols="80" onChange={changeHandler} ref={register}/>
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
    status: state.status,
    salesList: state.salesList || [],
    error: state.error,
  };
};

export default connect(mapStateToProps)(Sale);

function calcTotals (invoiceLines = [], incVat) {
  const results = {
      inc: 0,
      ex: 0,
      vat: 0
    }
    invoiceLines.forEach(el => {
      if (incVat) {
        results.inc += el.amount * el.price
        results.ex += el.amount * el.price / ((el.vat / 100) + 1)
        results.vat += (el.amount * el.price / ((el.vat / 100) + 1)) * (el.vat / 100)
      } else {
        results.inc += el.amount * el.price * ((el.vat / 100) + 1);
        results.ex += el.amount * el.price;
        results.vat += el.amount * el.price * (el.vat / 100);
      }
    })
  
  return results
}

// function stringifyInvoicelines (lines) {
//   const results = {}
//   lines.forEach((line,index) => {
//     results['line_'+Number(index+1)+'_amount'] = line.amount
//     results['line_'+Number(index+1)+'_sku'] = line.sku
//     results['line_'+Number(index+1)+'_description'] = line.description
//     results['line_'+Number(index+1)+'_price'] = line.price
//     results['line_'+Number(index+1)+'_vat'] = line.vat
//   })
//   return results
// }

// function arrayFromObjectStrings (items) {
//   const results = {}
//   for(const item in items) {
//     if(item.includes('line_')){
//       const splitItem = item.split('_')
//       const index = Number(splitItem[1])-1
//       if(!results.invoiceLines[index]){
//         results.invoiceLines[index] = {}
//       }
//       results.invoiceLines[index][splitItem[2]] = items[item]
//     }else{
//       results[item] = items[item]
//     }
//   }
//   return results
// }
