import React, {useState} from 'react'
import './login.css'
// import { log } from 'util';
import { connect } from 'react-redux';
import { register, login } from '../utils/actions';

function Login(props) {

    const defaultRegisterDets = {
        company: '',
        email: '',
        password: '',
    }

    const [registerDets, setRegisterDets] = useState(defaultRegisterDets)

    const [loginDets, setLoginDets] = useState({email: '', password:''})

    const [regestering, setRegestering] = useState(false)

    const handleChange = (e) => {
        if(e.target.parentElement.id === 'login-form'){
            setLoginDets({...loginDets, [e.target.name]: e.target.value})
        }else if(e.target.parentElement.id === 'register-form'){
            setRegisterDets({...registerDets, [e.target.name]: e.target.value})
        }
    }

    const submitForm = (e) => {
      e.preventDefault()
      if(e.target.id === 'login-form'){
        props.dispatch(login(loginDets.email,loginDets.password))
      }else if(e.target.id === 'register-form'){
        props.dispatch(register(registerDets.email, registerDets.password, registerDets.company))
      } 
      
    }

    const loginEl = (
        <div className="login-page">
        <div className="form">
          <form id="login-form" onSubmit={submitForm}>
            <input name='email' type="email" value={loginDets.email} onChange={handleChange} placeholder="email"/>
            <input name='password' type="password" value={loginDets.password} onChange={handleChange} placeholder="password"/>
            <button>login</button>
            <p className="message">Not registered? </p><p className='link' onClick={() => {setRegestering(true)}}> Create an account</p>
          </form>
        </div>
        </div>
      
    )

    const registerEl = (
        <div className="login-page">
        <div className="form">
          <form id="register-form" onSubmit={submitForm}>
            <input name='email' type="email" value={registerDets.email} onChange={handleChange} placeholder="email"/>
            <input name='company' type="text" value={registerDets.company} onChange={handleChange} placeholder="company"/>
            <input name='password' type="password" value={registerDets.password} onChange={handleChange} placeholder="password"/>
            <button>register</button>
            <p className="message">Already registered? </p><p className='link' onClick={() => {setRegestering(false)}}>Sign In</p>
          </form>
        </div>
      </div>
    )

  return (
    regestering ? registerEl : loginEl
  )
}

function mapStateToProps(state) {
  return {
    userid: state.userid,
    email: state.email,
    error: state.error
  };
};

export default connect(mapStateToProps)(Login);