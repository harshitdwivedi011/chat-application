import React from 'react'
import './ButtonComponent.css';
const ButtonComponent = ({ type, text, id, onClick }) => {
    return (
        <button className='buttons' type={type} id={id} onClick={onClick}>{text}</button>
    )
}

export default ButtonComponent;
