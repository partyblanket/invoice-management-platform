import React, {useState} from 'react'
import { connect } from 'react-redux';
import {submitTemplate} from '../utils/actions'

import './templates.css'

const formToSubmit = new FormData();




function Templates(props) {
  const [newVisible, setNewVisible] = useState(false)
  const [form, setForm] = useState({file:'',title:''})
  const templateElements = props.templates.map(el => (
    <div className='templateElement'></div>
  ))

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form);
    formToSubmit.set('userid', props.userid)
    formToSubmit.set('title', form.title)
    props.dispatch(submitTemplate(formToSubmit))

  }

  const handleChange = e => {
    if(e.target.name === 'file'){
      formToSubmit.set('file', e.target.files[0])
    }else{
      // formToSubmit.append('title', e.target.value)
    }
    setForm({...form, [e.target.name]:e.target.value})
  }
  

  return (
      <>
        <div className='templatesOuter'>
          <div className='templateElement'>
            <button>NEW</button>
          </div>
          {templateElements}

        </div> 
        <div className='newTemplate'>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={form.file} type='file' name='file'/>
            <input onChange={handleChange} value={form.title} type='text' name='title'/>
            <input type='submit'value='Submit'/>
          </form>
        </div>
      </>
  )
}

function mapStateToProps(state) {
  return {
    templates: state.templates || [],
    userid: state.userid
  };
};

export default connect(mapStateToProps)(Templates);