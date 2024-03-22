import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../../firebase';
import { ChatContext } from '../Context/ChatContext';

const UserPanel = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        // get real time updates/ data
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());

            });

            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    }
    return (
        <div className='panelList'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <span span className='panels' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <span className='panel'>
                        <p style={{ fontWeight: 600, fontSize: "larger" }}>{chat[1].userInfo.displayName}</p>
                        <p className='message'>{chat[1].lastMessage?.text}</p>
                    </span>

                </span>
            ))}
        </div >
    )
}

export default UserPanel
