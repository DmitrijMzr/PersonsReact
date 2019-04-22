import React, {Component} from 'react';

class RegistrationForm extends Component {
    render() {
        return (
            <div className="form-reg">
                <form id="form">
                    <div className="header">Registration</div>
                    <input id="login" type="text" className="image user" required placeholder='Create a login *'/>
                    <input id="mail" type="email" className="image mail" required placeholder='Your e-mail *'/>
                    <input id="password" type="password" className="image pass" required placeholder='Password *'/>
                    <input id="confirmPass" type="password" className="image conPass" required
                           placeholder='Confirm password *'/>
                    <div id="msg" className="note">*requaired fields</div>
                    <button id="registration" type="submit" className="bttn">Register</button>
                </form>
            </div>
        );
    }
}
export default RegistrationForm;