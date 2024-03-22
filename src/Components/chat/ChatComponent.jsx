import React, { useContext, useEffect, useState } from 'react'
import videoCall from '../../Images/videoCall.png';
import call from '../../Images/call.png';
import threeDots from '../../Images/threeDots.png';
import './chatcomponent.css'
import Message from './Message';
import ChatInput from '../Input/ChatInput';
import { ChatContext } from '../Context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
const ChatComponent = () => {
    const { data } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })
        return () => {
            unsub();
        }
    }, [data.chatId])

    return (
        <div className="chat-body">
            <div className='chat-header'>
                <p className='current-user'>{data.user?.displayName}</p>
                <span className='options'>
                    <img src={videoCall} alt="" />
                    <img src={call} alt="" />
                    <img src={threeDots} alt="" />
                </span>
            </div>
            <section className="chat-section">
                {messages.map((m) => (
                    <Message message={m} key={m.id} date={m.date} />
                ))}
            </section>
            <ChatInput />
        </div>
    )
}

export default ChatComponent
