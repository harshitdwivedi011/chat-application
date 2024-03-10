import React from 'react'
import './Common.css';
import { NavLink } from 'react-router-dom';
import constants from '../constants';
import InputComponent from '../Components/Input/InputComponent';
import ButtonComponent from '../Components/Button/ButtonComponent';
const Login = () => {
    return (
        <div className='form-login'>
            <p className='header'>{constants.appName}</p>
            <p className='sub-header'>{constants.login}</p>
            <InputComponent type="email" id="email" placeholder='Enter Email Address' />
            <InputComponent type="password" id="password" placeholder='Enter Password' />
            <ButtonComponent type="button" id="register" text="Login" />
            <span>You don't have an account?
                <NavLink to='/register'>{constants.register}</NavLink>
            </span>
        </div>
    )
}

export default Login
