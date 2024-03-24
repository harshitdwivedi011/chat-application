import React from 'react'
import Sidebar from '../Components/SideBar/Sidebar'
import ChatComponent from '../Components/chat/ChatComponent'
import './common.css';

const Home = () => {
    return (
        <div className="home-wrapper">
            <div className='chat-window'>
                <Sidebar />
                <ChatComponent />
            </div>
        </div>
    )
}

export default Home
