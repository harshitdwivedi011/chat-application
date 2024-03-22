import React, { useContext } from 'react'
import constants from '../../constants'
import ButtonComponent from '../Button/ButtonComponent'
import SearchComponent from '../Input/SearchComponent'
import UserPanel from './UserPanel';
import './Sidebar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../Context/AuthContext'
const Sidebar = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div id="root-sidebar">
            <div className='sidebar'>
                <div id='subheader-sidebar'>
                    <p>{constants.appName}</p>
                    <span id='user-info'>
                        <img src={currentUser.photoURL} alt="" />
                        <span id='logged-user'>{currentUser.displayName}</span>
                        <ButtonComponent type="button" id="button" text="Log Out" onClick={() => signOut(auth)} />
                    </span>
                </div>
                <SearchComponent />
                <UserPanel />
            </div>
        </div>
    )
}

export default Sidebar
