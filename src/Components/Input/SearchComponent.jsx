import React, { useContext, useState } from 'react'
import InputComponent from './InputComponent'
import './inputComponent.css';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase';
import { AuthContext } from '../Context/AuthContext';

const SearchComponent = () => {
    const [username, setUsername] = useState(''); // for input users
    const [user, setUser] = useState(null); // for actual users
    // const [searched, setSearched] = useState(false); // Add a state to track if search has been attempted
    // const [isAvailable, setIsAvailable] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const handleSearch = async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('displayName', '==', username))
            console.log(q, "Q")
            const querySnapshot = await getDocs(q);
            // if (querySnapshot.empty) {
            //     setIsAvailable(false);
            // } else {
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                console.log(user, "user1")
            });
            // setIsAvailable(true);
            // }
            // setSearched(true); // Mark search as attempted
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
        } catch (err) {
            console.log(err);
        }
        setUsername("")
        setUser(null);
    }
    return (
        <div className='search-user'>
            <InputComponent type="search" id="search" placeholder="Find a User" onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} value={username} />
            {/* {searched && !isAvailable ? (
                <div className='results'>No results found</div>
            ) : ( */}
            {/* isAvailable  */}
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
