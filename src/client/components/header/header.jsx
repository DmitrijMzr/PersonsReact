import React from 'react';
import { connect } from 'react-redux'
import Logout from "../Logout";

function Header(props) {
    const userName = props.userName;
    return(
        <div className='header'>
            <h1>CRUD node.js</h1>
            <h2>Hello, {userName}!</h2>
            <Logout classList="data__button_logout"/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userName: state.common.userName
    };
};

export default connect(mapStateToProps)(Header);