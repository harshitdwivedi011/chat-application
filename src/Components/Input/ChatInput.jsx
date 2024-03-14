import React from 'react'
import InputComponent from './InputComponent'
import './inputComponent.css';
import ButtonComponent from '../Button/ButtonComponent';
import attach_file from '../../Images/attach_file.png';
import shadow_add from '../../Images/shadow_add.png';


const ChatInput = () => {
    return (
        <div id="enter-message">
            <InputComponent type="text" placeholder="Type something..." id="enter-text" />
            <div className='send'>
                <InputComponent type="file" id="file" />
                <label htmlFor="file">
                    <img src={attach_file} alt="" />
                </label>
                <InputComponent type="file" id="file" />
                <label htmlFor="file">
                    <img src={shadow_add} alt="" />
                </label>

                <ButtonComponent text="Send" />
            </div>
        </div>
    )
}

export default ChatInput
