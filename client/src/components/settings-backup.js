import React, { useState } from 'react'

import { connect } from 'react-redux';
import { saveSettings } from '../utils/actions';

const views = {
  general: ['name', 'company', 'addressLineOne', 'addressLineTwo', 'postcode', 'city', 'phone', 'nextSale'],
  templates: ['logo']
}

const templates =
  <div className='templates'>
    <div>
      <img alt='basic template' src='/icons/template2.png'></img>
      <div>
        <input type='radio' />
      </div>
    </div>
    <div>
      <img alt='simple template' src='/icons/simple-template.png'></img>
      <div>
        <input type='radio' />
      </div>
    </div>
  </div>

const settingsItems = {
  name: { title: 'Name', type: 'text' },
  company: { title: 'Company', type: 'text' },
  addressLineOne: { title: 'Address Line 1', type: 'text' },
  addressLineTwo: { title: 'Address Line 2', type: 'text' },
  postcode: { title: 'Postcode', type: 'text' },
  city: { title: 'City', type: 'text' },
  phone: { title: 'Phone Number', type: 'text' },
  vat: { title: 'VAT rates', type: 'arrayOfString' },
  nextSale: { title: 'Next invoice #', type: 'number' },
  logo: { title: 'Logo (URL)', type: 'text' },
}

function Settings(props) {
  const [localSettings, setLocalSettings] = useState({ name: props.name, addressLineOne: props.addressLineOne, addressLineTwo: props.addressLineTwo, postcode: props.postcode, city: props.city, phone: props.phone, company: props.company, vat: props.vat, nextSale: props.nextSale })

  const handleChange = (e) => {
    setLocalSettings({ ...localSettings, [e.target.name]: e.target.value });
  }

  const [view, setView] = useState('general')

  return (
    <>
      <div id='settings'>
        <div id='category'>
          <div className='button' onClick={() => setView('general')}>General</div>
          <div className='button' onClick={() => setView('templates')}>Templates</div>
        </div>
        <div id='items'>
          {views[view].map(el => (<div key={el}>
            <div>{settingsItems[el].title}</div><input type={el.type} name={el} value={localSettings[el] || ''} onChange={handleChange}></input>
          </div>))}
          <div className='button save' onClick={() => props.dispatch(saveSettings(props.userid, localSettings))}>SAVE</div>
        </div>

      </div>
      {view === 'templates' && templates}
    </>
  )
}

function mapStateToProps(state) {
  return {
    userid: state._id,
    name: state.name,
    company: state.company,
    addressLineOne: state.addressLineOne,
    addressLineTwo: state.addressLineTwo,
    postcode: state.postcode,
    city: state.city,
    phone: state.phone,
    vat: state.vat,
    nextSale: state.nextSale,
    logo: state.logo,
  };
};

export default connect(mapStateToProps)(Settings);