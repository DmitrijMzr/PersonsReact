import React, {Component} from "react";
import {connect} from 'react-redux';
import {setPage, setUserName, init} from '../actions';
import Persons from './persons/Persons.jsx';
import ToDoList from './todoList/ToDoList.jsx';
import LoginForm from "./loginForm/loginForm";
import RegistrationForm from "./registrationForm/registrationForm";
import Loading from "./loading/loading";
import MsgContext from './MsgContext';
import MsgBox from './MsgBox.jsx';

class App extends Component {
    state = {
        msgData: {
            msgText: '',
            msgColor: '',
            msgVisibility: 'hidden'
        },
        isHidden: false,
    };
    lastIndex = 3;
    timeoutID = null;

    componentDidMount() {
        this.props.init(this);
    }

    login = data => {
        this.props.setPage('main');
        this.props.setUserName(data);
    };

    hideMsg = () => {
        this.setState(() => ({msgData: {msgVisibility: 'hidden'}}));
    };

    renderMsg = (msg, color) => {
        this.setState(state => {
            if (this.timeoutID !== null) {
                clearTimeout(this.timeoutID);
            }
            this.timeoutID = setTimeout(this.hideMsg ,3000);
            return {
                msgData: {
                    msgColor: color,
                    msgText: msg ? msg : '',
                    msgVisibility: 'visible'
                }
            };
        });
    };

    render() {
        const {userName} = this.state;
        const page = this.props.page;
        let content;
        switch(page) {
            case 'pending':
                content = <Loading />;
                break;
            case 'login':
                content = (
                    <><div className="loginForm"><LoginForm login = {this.login}/></div><MsgBox/></>
                );
                break;
            case 'register':
                content = <div className="loginForm"><RegistrationForm/></div>;
            break;
            case 'main':
                content = <Persons/>;
                break;
            case 'todoList':
                content = <ToDoList/>;
                break;
            default:
                content = <div>no such page</div>;
        }

        return (
            <MsgContext.Provider value = {{renderMsg: this.renderMsg, msgData: this.state.msgData}}>
                {content}
            </MsgContext.Provider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.common.page
    };
};

export default connect(mapStateToProps, {setPage, setUserName, init})(App);