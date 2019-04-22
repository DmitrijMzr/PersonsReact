import React, {Component} from 'react';
import {InputForm, verify} from './logicForLogin';

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
    
    logging = () => {
        verify(this.state.inputLogin, this.state.inputPassword);
    }

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
                            className="bttn">
                        Registration
                    </button>
                    <input id="response"
                           type="text"
                    />
                </form>
            </div>
        );
    }
}
export default LoginForm;