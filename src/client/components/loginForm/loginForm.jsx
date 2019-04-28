import React, {Component} from 'react';
import {InputForm, verify, verifyRegister} from './logicForLogin';
import MsgContext from "../MsgContext";

class LoginForm extends Component {
    state = {
        inputLogin: '',
        inputPassword: ''
    }

    onChange = (e) => {
        if (e.target.name === 'inputLogin') {
            this.setState({[e.target.name]: e.target.value})
        }
        if (e.target.name === 'inputPassword') {
            this.setState({[e.target.name]: e.target.value})
        }
    }
    
    logging = event => {
        const login = this.state.inputLogin;
        const pass = this.state.inputPassword;
        verify(login, pass)
            .then(() => {
                this.props.login(login);
            })
            .catch(error => {
                this.context.renderMsg(error);
            });
        event.preventDefault();
    }

    register = event => {
        const login = this.state.inputLogin;
        const pass = this.state.inputPassword;
        verifyRegister(login, pass)
            .then(data => {
                this.props.login(data);
            })
            .catch(error => {
                this.context.renderMsg(error);
            });
        event.preventDefault();
    };

    render() {
        return (
            <div className="form-reg form-log">
                <form id="form">
                    <div className="header">
                        Member login
                    </div>
                    <input name='inputLogin'
                           id="login"
                           type="text"
                           className="image user"
                           required
                           placeholder='Username'
                           onChange={this.onChange}
                           autoFocus="autofocus"
                    />
                    <input name='inputPassword'
                           id="password"
                           type="password"
                           className="image pass"
                           required
                           placeholder='Password'
                           onChange={this.onChange}
                    />
                    <button
                        type="submit"
                        className="bttn"
                        onClick={this.logging}>
                        Sing in
                    </button>
                    <button id="registration"
                            className="bttn"
                            onClick = {this.register}>
                        Registration
                    </button>
                    <input id="response"
                           type="text"
                           autoComplete="off"
                    />
                </form>
            </div>
        );
    }
    static contextType = MsgContext;
}
export default LoginForm;