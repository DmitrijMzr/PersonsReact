import React from 'react';

function LoginForm() {
    return(
        <div className="form-reg form-log">
            <form id="form">
                <div className="header">Member login</div>
                <input id="login" type="text" className="image user" required placeholder='Username' autoComplete="off"/>
                <input id="password" type="password" className="image pass" required placeholder='Password' autoComplete="off"/>
                        <button type="submit" className="bttn">Sing in</button>
                        <button id="registration" className="bttn">Registration</button>
                        <input id="response" type="text"/>
            </form>
        </div>
    );
}
export default LoginForm;