import React, {Component} from "react";
import {logout as sendLogout} from "./logic";
import MsgContext from "./MsgContext";
import {setPage, setUserName} from "../actions";
import {connect} from "react-redux";


class Logout extends Component {
    logout = () =>{
        sendLogout()
            .then(() => {
                console.log('login out success');
                this.props.setPage('login');
                this.props.setUserName('');
            })
            .catch(err => {
                if (err === undefined) {
                    this.context.renderMsg('cannot logout due to a server error', 'red');
                } else {
                    this.context.renderMsg(err, 'red');
                }
            });
    };
    render() {
        return <button className='data__button' onClick={this.logout}>Logout</button>;
    }
    static contextType = MsgContext;
}

export default connect(null, {setPage, setUserName})(Logout);