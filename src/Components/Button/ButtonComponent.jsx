import React from 'react'
import './ButtonComponent.css';
const ButtonComponent = ({ type, text, id }) => {
    return (
        <button className='buttons' type={type} id={id}>{text}</button>
    )
}

export default ButtonComponent;
