import React from 'react'
import InputComponent from '../Components/Input/InputComponent';
import ButtonComponent from '../Components/Button/ButtonComponent';
import constants from '../constants';
import './Common.css';
import { NavLink } from 'react-router-dom';
import add from '../Images/addAvatar.png'
const Register = () => {
    return (
        <div className='form-register'>
            <p className='header'>{constants.appName}</p>
            <p className='sub-header'>{constants.register}</p>
            <InputComponent type="text" id="name" placeholder="Enter Name" />
            <InputComponent type="email" id="email" placeholder='Enter Email Address' />
            <InputComponent type="password" id="password" placeholder='Enter Password' />
            <InputComponent type="file" id="file" />
            <label htmlFor="file" id='blob-input'>
                <img src={add} alt="" />
                <span> Add an avatar</span>
            </label>
            <ButtonComponent type="button" id="register" text="Register" />
            <span>You do have an account?
                <NavLink to='/login'>{constants.login}</NavLink>
            </span>
        </div>
    )
}

export default Register;
