import React from 'react'
import './chatcomponent.css';
import profile from '../../Images/profile.jpg'
const Message = () => {
    return (
        <div className="message owner">
            <div className="messageInfo">
                <img src={profile} alt="" />
                <span className='last-seen'>Just now</span>
            </div>
            <div className="messageContent">
                <p className='text-message'>abc</p>
                {/* <img src={profile} alt="" /> */}
            </div>
        </div>
    )
}

export default Message
