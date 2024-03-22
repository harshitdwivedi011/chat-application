import React, { useContext, useEffect, useRef } from 'react'
import './chatcomponent.css';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
const Message = ({ message, date }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    // console.log(date.toDate(), "messa");

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
        </div>
    )
}

export default Message
