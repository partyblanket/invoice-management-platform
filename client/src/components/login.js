import React, {useState} from 'react'
import './login.css'
// import { log } from 'util';
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { register, login } from '../utils/actions';

function Login(props) {

  const { from } = props.location.state || {
        from: { pathname: "/" },
    };

    if (props.username) {
        return <Redirect to={from} />;
    }

    const defaultRegisterDets = {
        company: '',
        username: '',
        password: '',
    }

    const [registerDets, setRegisterDets] = useState(defaultRegisterDets)

    const [loginDets, setLoginDets] = useState({username: '', password:''})

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
        props.dispatch(login(loginDets.username,loginDets.password))
      }else if(e.target.id === 'register-form'){
        props.dispatch(register(registerDets.username, registerDets.password, registerDets.company))
      } 
      
    }

    const loginEl = (
        <div className="login-page">
        <div className="form">
          <form id="login-form" onSubmit={submitForm}>
            <input name='username' type="username" value={loginDets.username} onChange={handleChange} placeholder="username"/>
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
            <input name='username' type="username" value={registerDets.username} onChange={handleChange} placeholder="username"/>
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
    username: state.username,
    error: state.error
  };
};

export default connect(mapStateToProps)(Login);