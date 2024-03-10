import React from 'react'
import './inputComponent.css';

const InputComponent = ({ type, id, placeholder }) => {
    return (
        <input className='inputfields' type={type} id={id} placeholder={placeholder} />
    )
}

export default InputComponent;
