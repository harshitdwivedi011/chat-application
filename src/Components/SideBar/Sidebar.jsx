import React from 'react'
import constants from '../../constants'
import person from '../../Images/person.png'
import ButtonComponent from '../Button/ButtonComponent'
import SearchComponent from '../Input/SearchComponent'
import UserPanel from './UserPanel';
import './Sidebar.css'
const Sidebar = () => {
    return (
        <div id="root-sidebar">
            <div className='sidebar'>
                <div id='subheader-sidebar'>
                    <p>{constants.appName}</p>
                    <span id='user-info'>
                        <img src={person} alt="" />
                        <span id='logged-user'>Harshit</span>
                        <ButtonComponent type="button" id="button" text="Log Out" />
                    </span>
                </div>
                <SearchComponent />
                <UserPanel icon={person} name="Bob" lastMessage="Hi Harshit" />
                <UserPanel icon={person} name="Shobhit" lastMessage="Hi Harshit" />
                <UserPanel icon={person} name="Mayank" lastMessage="Hi Harshit, How are you?" />
            </div>
        </div>
    )
}

export default Sidebar
