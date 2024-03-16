import React from 'react'
import InputComponent from '../Components/Input/InputComponent';
import ButtonComponent from '../Components/Button/ButtonComponent';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase'
import constants from '../constants';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './Common.css';
import { NavLink, useNavigate } from 'react-router-dom';
import add from '../Images/addAvatar.png'
const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        console.log(file);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, username);
            console.log(storageRef);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(result.user, {
                            displayName: username,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, 'users', result.user.uid), {
                            uid: result.user.uid,
                            displayName: username,
                            email,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db, "userChats", result.user.uid), {})
                        navigate('/')
                    });
                }
            );
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='form-register'>
            <p className='header'>{constants.appName}</p>
            <p className='sub-header'>{constants.register}</p>
            <form className='form-wrapper' onSubmit={handleSubmit}>
                <InputComponent type="text" id="name" placeholder="Enter Name" />
                <InputComponent type="email" id="email" placeholder='Enter Email Address' />
                <InputComponent type="password" id="password" placeholder='Enter Password' />
                <InputComponent type="file" id="file" />
                <label htmlFor="file" id='blob-input'>
                    <img src={add} alt="" />
                    <span> Add an avatar</span>
                </label>
                <ButtonComponent type="submit" id="register" text="Register" />
            </form>
            <span>You do have an account?
                <NavLink to='/login'>{constants.login}</NavLink>
            </span>
        </div>
    )
}

export default Register;
