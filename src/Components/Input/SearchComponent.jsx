import React, { useContext, useState } from 'react'
import InputComponent from './InputComponent'
import './inputComponent.css';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { toast } from 'react-toastify'

const SearchComponent = () => {
    const [username, setUsername] = useState(''); // for input users
    const [user, setUser] = useState(null); // for actual users
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const handleSearch = async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('displayName', '==', username))
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                toast.error("No matches found!");
                setUsername("")
            } else {
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                });
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }
    const handleSelect = async () => {
        // check whether the group exists, if not create new one
        const combinedId = currentUser.uid > user.id ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                // create chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] })
                // create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
            dispatch({ type: "CHANGE_USER", payload: user })
        } catch (err) {
            console.log(err);
        }
        setUsername("")
        setUser(null);
    }
    return (
        <div className='search-user'>
            <InputComponent type="search" id="search" placeholder="Find a User" onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} value={username} />
            {user &&
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>

            }
        </div>
    )
}

export default SearchComponent
