import React from 'react';
import { connect } from 'react-redux';
import {setPage, setUserName} from "../../../actions";

function Header(props) {
    const userName = props.userName;
    const logout = props.logout;
    return(
        <div className='header'>
            <h1>CRUD node.js</h1>
            <h2 id='userName'>Hello, {userName}!</h2>
            <button id='logout' className='data__button' onClick={logout}>Logout</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName
    };
};

export default connect(mapStateToProps)(Header);