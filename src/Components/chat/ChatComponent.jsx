import React from 'react'
import videoCall from '../../Images/videoCall.png';
import call from '../../Images/call.png';
import threeDots from '../../Images/threeDots.png';
import './chatcomponent.css'
import Message from './Message';
import ChatInput from '../Input/ChatInput';
const ChatComponent = () => {
    return (
        <div className="chat-body">
            <div className='chat-header'>
                <p className='current-user'>Bob</p>
                <span className='options'>
                    <img src={videoCall} alt="" />
                    <img src={call} alt="" />
                    <img src={threeDots} alt="" />
                </span>
            </div>
            <section className="chat-section">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </section>
            <ChatInput />
        </div>
    )
}

export default ChatComponent
