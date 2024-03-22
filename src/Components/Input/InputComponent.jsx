import React from 'react'
import './inputComponent.css';

const InputComponent = ({ type, id, placeholder, onChange, onKeyDown, value }) => {
    return (
        <input className='inputfields' type={type} id={id} placeholder={placeholder} onKeyDown={onKeyDown} onChange={onChange} value={value} />
    )
}

export default InputComponent;
