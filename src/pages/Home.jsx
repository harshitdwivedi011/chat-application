import React from 'react'
import './Common.css'
import Login from './Login';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';

const Home = () => {
    return (
        <div className='parent'>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>
    )
}

export default Home
