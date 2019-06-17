import React, {useState} from 'react'
import { connect } from 'react-redux';
import {submitTemplate} from '../utils/actions'

import './templates.css'

const formToSubmit = new FormData();




function Templates(props) {
  const [newVisible, setNewVisible] = useState(false)
  const [form, setForm] = useState({file:'',title:'', templateType:'invoice'})
  const templateElements = props.templateArray.map(el => (
    <div key={el._id} className='templateElement'>{el.title}</div>
  ))

  const handleSubmit = (e) => {
    e.preventDefault()
    formToSubmit.set('userid', props.userid)
    formToSubmit.set('title', form.title)
    formToSubmit.set('templateType', form.templateType)
    props.dispatch(submitTemplate(formToSubmit))
    setNewVisible(false)

  }

  const handleChange = e => {
    if(e.target.name === 'file'){
      formToSubmit.set('file', e.target.files[0])
    }else{
      // formToSubmit.append('title', e.target.value)
    }
    setForm({...form, [e.target.name]:e.target.value})
  }
  
  const newTemplateElement = (
    <div className='newTemplate'>
    <form onSubmit={handleSubmit}>
      <div><p>.docx file</p><input onChange={handleChange} value={form.file} type='file' name='file' /></div>
      <div><p>title</p><input onChange={handleChange} value={form.title} type='text' name='title'/></div>
      <div><p>type</p><select onChange={handleChange} value={form.title} type='text' name='templateType'><option name='invoice'>Invoice</option></select></div>
      <div><input type='submit'value='Submit'/></div>
    </form>
  </div>
  )

  return (
      <>
        <div className='templatesOuter'>
          <div className='templateElement'>
            <button onClick={() => setNewVisible(true)}>NEW</button>
          </div>
          {templateElements}
          {newVisible && newTemplateElement}
        </div> 

      </>
  )
}

function mapStateToProps(state) {
  return {
    templateArray: state.templateArray || [],
    userid: state.userid
  };
};

export default connect(mapStateToProps)(Templates);