import React from 'react'
import './Common.css';
import { NavLink, useNavigate } from 'react-router-dom';
import constants from '../constants';
import InputComponent from '../Components/Input/InputComponent';
import ButtonComponent from '../Components/Button/ButtonComponent';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        // console.log(email, password)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='form-login'>
            <p className='header'>{constants.appName}</p>
            <p className='sub-header'>{constants.login}</p>
            <form onSubmit={handleSubmit}>
                <InputComponent type="email" id="email" placeholder='Enter Email Address' />
                <InputComponent type="password" id="password" placeholder='Enter Password' />
                <ButtonComponent type="submit" id="login" text="Login" />
            </form>
            <span>You don't have an account?
                <NavLink to='/register'>{constants.register}</NavLink>
            </span>
        </div>
    )
}

export default Login
