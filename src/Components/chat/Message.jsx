import React, { useContext, useEffect, useRef } from 'react'
import './chatcomponent.css';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import bin from '../../Images/bin.png';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify'
const Message = ({ message, date }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    const formatDate = (inputdate) => {
        const processedDate = inputdate.toDate(); // Convert inputDate to a JavaScript Date object
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayOfWeek = daysOfWeek[processedDate.getDay()]; // Get day of the week (0-6)
        const dayOfMonth = processedDate.getDate(); // Get day of the month (1-31)
        const month = monthsOfYear[processedDate.getMonth()]; // Get month (0-11)
        const hours = processedDate.getHours();
        const minutes = processedDate.getMinutes();
        const seconds = processedDate.getSeconds();

        const showDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
        const showTime = `${hours}:${minutes}:${seconds}`;
        return [showDate, showTime];
    }
    const handleDeleteMessage = async () => {
        try {
            const chatRef = doc(db, 'chats', data.chatId);
            await updateDoc(chatRef, {
                messages: arrayRemove(message) // Remove the message from the messages array
            });
        } catch (error) {
            toast.error("Please try again");
            console.log(error)
        }
    };
    const [showDate, showTime] = formatDate(date);
    return (
        <div ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL : data.user.photoURL
                } alt="" />
                <span className='last-seen'>{showDate}</span>
            </div>
            <div className="messageContent">
                <p className='text-message'>{message.text}
                    <span className='message-time'>{showTime}</span>
                </p>
                {message.img &&
                    <img src={message.img} alt="" />}
            </div>
            <button type="submit" className='delete-Message' onClick={handleDeleteMessage}>
                <img src={bin} alt="" />
            </button>
        </div>
    )
}

export default Message
