import React from 'react';

function Header(props) {
    const userName = props.userName;
    return(
        <div className='header'>
            <h1>CRUD node.js</h1>
            <h2 id='userName'>Hello, {userName}!</h2>
            <button id='logout' className='data__button'>Logout</button>
        </div>
    );
}

export default Header;