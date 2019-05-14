import React, {useState} from 'react'
import { connect } from 'react-redux';
import { saveSettings } from '../utils/actions';


const activeItems = ['name', 'company', 'addressLineOne', 'addressLineTwo', 'postcode', 'city', 'phone']

const settingsItems = {
  name: {title: 'Name'},
  company: {title: 'Company', type:'string'},
  addressLineOne: {title: 'Address Line 1', type:'string'},
  addressLineTwo: {title: 'Address Line 2', type:'string'},
  postcode: {title: 'Postcode', type:'string'},
  city: {title: 'City', type:'string'},
  phone: {title: 'Phone Number', type:'string'},
  vat: {title: 'VAT rates', type:'arrayOfString'},
}





function Settings(props) {
  const [localSettings, setLocalSettings] = useState(props.settings)

  const handleChange = (e) => {
    setLocalSettings({...localSettings, [e.target.name]: e.target.value}); 
  }

  return (
    <div id='settings'>
      <div id='category'>
        <div>General</div>
      </div>
      <div id='items'>
        {activeItems.map(el => (<div key={el}>
          <div>{settingsItems[el].title}</div><input type='text' name={el} value={localSettings[el] || ''} onChange={handleChange}></input>
        </div>))}
        <div className='button save' onClick={() => props.dispatch(saveSettings(props.userid, localSettings))}>SAVE</div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    settings: state.settings || {},
    userid: state.userid
  };
};

export default connect(mapStateToProps)(Settings);