import React from 'react'
import './Sidebar.css'

const UserPanel = ({ icon, name, lastMessage, id }) => {
    return (
        <span className='panels' id={id} >
            <img src={icon} alt="" />
            <span className='panel'>
                <p style={{ fontWeight: 600, fontSize: "larger" }}>{name}</p>
                <p className='message'>{lastMessage}</p>
            </span>

        </span>
    )
}

export default UserPanel
