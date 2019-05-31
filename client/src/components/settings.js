import React, { useState } from 'react'
import useForm from 'react-hook-form'

import { connect } from 'react-redux';
import { saveSettings } from '../utils/actions';

//https://react-hook-form.now.sh/api
function SettingsForm({props}) {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: 
      {...props}
  })

  const onSubmit = data => { 
    props.dispatch(saveSettings(props.userid, data)) 
  };
  
  return (
    <form id='items' onSubmit={handleSubmit(onSubmit)}>
      <div>Name</div><input type="text" name="name" ref={register} />
      <div>Company</div><input type="text" name="company" ref={register({ required: 'field required' })} />
      {errors.company && <span>{errors.company.message}</span>}
      <div>Address Line One</div><input type="text" name="addressLineOne" ref={register({ required: 'field required' })} />
      {errors.addressLineOne && <span>{errors.addressLineOne.message}</span>}
      <div>Address Line Two</div><input type="text" name="addressLineTwo" ref={register} />
      {errors.addressLineTwo && <span>{errors.addressLineTwo.message}</span>}
      <div>Postcode</div><input type="text" name="postcode" ref={register({ required: 'field required' })} />
      {errors.postcode && <span>{errors.postcode.message}</span>}
      <div>City</div><input type="text" name="city" ref={register({ required: 'field required' })} />
      {errors.city && <span>{errors.city.message}</span>}
      <div>Phone</div><input type="text" name="phone" ref={register({ required: 'field required' })} />
      {errors.phone && <span>{errors.phone.message}</span>}
      <div>Next Sale #</div><input type="number" name="nextSale" ref={register({ required: 'field required' })} />
      {errors.nextSale && <span>{errors.nextSale.message}</span>}
      <div>Logo url</div><input type="text" name="logo" ref={register} />
      {errors.logo && <span>{errors.logo.message}</span>}
      <input type="submit" value='Submit'/>
    </form>
  )
}

// const views = {
//   general: ['name', 'company', 'addressLineOne', 'addressLineTwo', 'postcode', 'city', 'phone', 'nextSale'],
//   templates: ['logo']
// }

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

function Settings(props) {
  const [view, setView] = useState('general')
  
  return (
    <>
      <div id='settings'>
        <div id='category'>
          <div className='button' onClick={() => setView('general')}>General</div>
          <div className='button' onClick={() => setView('templates')}>Templates</div>
        </div>
          <SettingsForm props={props}/>
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