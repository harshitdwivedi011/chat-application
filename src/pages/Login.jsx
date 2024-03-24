import React from 'react'
import './common.css';
import { NavLink, useNavigate } from 'react-router-dom';
import constants from '../constants';
import InputComponent from '../Components/Input/InputComponent';
import ButtonComponent from '../Components/Button/ButtonComponent';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = e.target[0].value;
        let password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
        catch (err) {
            toast.error("Invalid Credentials. Please try again.");
            e.target[0].value = ''
            e.target[1].value = ''
        }
    }
    return (
        <div className='form-login'>
            <p className='header'>{constants.appName}</p>
            <p className='sub-header'>{constants.login}</p>
            <form onSubmit={handleSubmit}>
                <InputComponent type="email" id="email" placeholder='Enter Email Address' />
                <InputComponent type="password" id="password" placeholder='Enter Password' />
                <NavLink to='/reset' className="forget-password">Forget Password?</NavLink>
                <ButtonComponent type="submit" id="login" text="Login" />
            </form>
            <span>You don't have an account?
                <NavLink to='/register'>{constants.register}</NavLink>
            </span>
        </div>
    )
}

export default Login
