import React, {useState, useEffect} from 'react'

export default function Main() {
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
    DueDate: '',

  }

  const [dets, setDets] = useState(detsDefault)

  const changeHandler = (e) => {
    const prevState = {...dets}
    const newState = {...prevState, [e.target.name]: e.target.value}
    setDets(newState)
  }

  useEffect(() => {
      console.log(dets);

  })

  return (
    <div className='main'>
      <h4>Invoice # 1234</h4>
      <div className='client-and-settings-container'>
        <div className='col1'>
          <p>Billing</p><p/>
          <p>Name</p><input name='BillingName' onChange={e => changeHandler(e)} value={dets.BillingName} />
          <p>Phone</p><input type='text' value={dets.BillingPhone}></input>
          <p>Address Line 1</p><input type='text' value={dets.BillingAddressLineOne}></input>
          <p>Address Line 1</p><input type='text' value={dets.BillingAddressLineTwo}></input>
          <p>Postcode</p><input type='text' value={dets.BillingPostcode}></input>
          <p>City</p><input type='text' value={dets.BillingCity}></input>

        </div>
        <div className='col2'>
        <p>Billing</p><p/>
          <p>Name</p><input type='text' value='test text'></input>
          <p>Phone</p><input type='text' value='test text'></input>
          <p>Address Line 1</p><input type='text' value='test text'></input>
          <p>Address Line 1</p><input type='text' value='test text'></input>
          <p>Postcode</p><input type='text' value='test text'></input>
          <p>City</p><input type='text' value='test text'></input>
        </div>
        <div className='col3'>
          <p>Name</p>
          <input type='text' value='test text'></input>
        </div>
      </div>
      <div className='items'>
          <img src='/plus.svg' style={{height: '1.5rem'}}></img>
          <div>Amnt.</div>
          <div>SKU</div>
          <div>Item description</div>
          <div>VAT</div>
          <div>Total:</div>
          <img src='/minus.svg' style={{height: '1.5rem'}}></img>
          <input type='text' className='amount' value='1' />
          <input type='text' className='sku' value='30.455'></input>
          <input type='text' className='item' value='Great Iten '></input>
          <input className='item'></input>
          <div>$10,00</div>
          <img src='/minus.svg' style={{height: '1.5rem'}}></img>
          <input type='text' className='amount' value='1' />
          <input type='text' className='sku' value='30.455'></input>
          <input type='text' className='item' value='Great Iten '></input>
          <input className='item'></input>
          <div>$10,00</div>
          <img src='/minus.svg' style={{height: '1.5rem'}}></img>
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
