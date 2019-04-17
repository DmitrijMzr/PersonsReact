import React, {Component} from "react";

import Header from './header/header';
import CreatePersons from "./createPersons/createPersons";
import DataTable from "./dataTable/dataTable";
import Buttons from "./buttons/buttons";
import LoginForm from "./loginForm/loginForm";
import RegistrationForm from "./registrationForm/registrationForm";
import {requestServerToPerson, requestServerToData} from './logic';

class App extends Component {
    state = {
        page: 'pending',
        userName: null,
        arrData: null,
    };

    componentDidMount() {
        requestServerToPerson()
            .then(data => {
                if (data.authorized) {
                    this.setState(() => {
                        return {userName: data.userName, page: 'main'};
                    });
                    requestServerToData()
                        .then(arrData => {
                            this.setState(() => {
                                return {arrData};
                            });
                        })
                        .catch();
                } else {
                    return {page: 'login'};
                }
            })
            .catch();
    }

    render() {
        const {page, userName, arrData} = this.state;

        if (page === 'pending') {
            return <div>Loading...</div>;
        }

        if (page === 'login') {
            return <LoginForm/>;
        }

        if (page === 'register') {
            return <RegistrationForm/>;
        }

        if (page === 'main') {
            return (
                <React.Fragment>
                    <Header userName={userName}/>
                    <div className='main'>
                        <CreatePersons/>
                        <DataTable arrData = {arrData}/>
                        <Buttons/>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default App;