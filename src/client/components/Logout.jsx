import React, {Component} from "react";
import {logout as sendLogout} from "./logic";
import MsgContext from "./MsgContext";
import {setPage, setUserName} from "../actions";
import {connect} from "react-redux";
import classNames from 'classnames';

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
        return <button className = {classNames(['data__button', this.props.classList])} onClick={this.logout}>Logout</button>;
    }
    static contextType = MsgContext;
    static defaultProps = {classList: []};
}

export default connect(null, {setPage, setUserName})(Logout);