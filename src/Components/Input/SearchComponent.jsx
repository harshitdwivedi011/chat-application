import React from 'react'
import InputComponent from './InputComponent'
import './inputComponent.css';

const SearchComponent = () => {
    return (
        <div className='search-user'>
            <InputComponent type="search" id="search" placeholder="Find a User" />
        </div>
    )
}

export default SearchComponent
