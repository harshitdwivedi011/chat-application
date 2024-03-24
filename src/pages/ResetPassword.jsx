import React from 'react'
import InputComponent from '../Components/Input/InputComponent'
import ButtonComponent from '../Components/Button/ButtonComponent'
import constants from '../constants'
import './common.css'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth, db } from '../firebase'
import { toast } from 'react-toastify'
import { collection, getDocs, query, where } from 'firebase/firestore'

const ResetPassword = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = e.target[0].value;
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            await sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success("Password reset email sent!")
                })
                .catch((error) => {
                    toast.error("Error in Password Reset!")
                });
        }
        else {
            toast.error("No records found with this email.");
        }
        e.target[0].value = ''
    }
    return (
        <div className='form-login'>
            <p className='header'>{constants.appName}</p>
            <p className='sub-header'>{constants.reset}</p>
            <form onSubmit={handleSubmit}>
                <InputComponent type="email" id="email" placeholder='Enter Email Address' />
                <ButtonComponent type="submit" id="login" text="Submit" />
            </form>
        </div>
    )
}

export default ResetPassword
