import React, { useContext, useState } from 'react'
import InputComponent from './InputComponent'
import './inputComponent.css';
import ButtonComponent from '../Button/ButtonComponent';
import attach_file from '../../Images/attach_file.png';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const ChatInput = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            setText(prevText => prevText + (prevText ? ", " : "") + file.name);
        }
    }
    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            }),
                        })
                    });
                }
            );
        }
        else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        setText("");
        setImg(null)
    }
    return (
        <div id="enter-message">
            <InputComponent type="text" placeholder="Type something..." id="enter-text" onChange={e => setText(e.target.value)} value={text} />
            <div className='send'>
                <InputComponent type="file" id="file" onChange={handleFileChange} />
                <label htmlFor="file">
                    <img src={attach_file} alt="" />
                </label>

                <ButtonComponent text="Send" onClick={handleSend} />
            </div>
        </div>
    )
}

export default ChatInput
