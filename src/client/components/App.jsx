import React, {Component} from "react";

import Header from './header/header';
import CreatePersons from "./createPersons/createPersons";
import DataTable from "./dataTable/dataTable";
import Buttons from "./buttons/buttons";
import LoginForm from "./loginForm/loginForm";
import RegistrationForm from "./registrationForm/registrationForm";
import {requestServerToPerson, requestServerToData} from './logic';
import Loading from "./loading/loading";

class App extends Component {
    state = {
        page: 'pending',
        userName: null,
        arrData: [],
        inputs: {
            id: '',
            fname: '',
            lname: '',
            age: ''
        }
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
                        .catch(error => {

                        });
                } else {
                    return {page: 'login'};
                }
            })
            .catch(() => {
                console.log('sever not found');
            });
    }

    idChange = (e) => {
        const value = e.target.value;
        console.log(e.target)
        this.setState(() => {
            return {inputs: {id: value}};
        });
    }

    fnameChange = (e) => {
        this.setState(() => {
            return {inputs: {fname: e.target.value}};
        });
    }

    lnameChange = (e) => {
        this.setState(() => {
            return {inputs: {lname: e.target.value}};
        });
    }

    ageChange = (e) => {
        this.setState(() => {
            return {inputs: {age: e.target.value}};
        });
    }

    create = () => {

    }

    render() {
        const {page, userName, arrData} = this.state;
        const {id, fname, lname, age} = this.state.inputs;
        if (page === 'pending') {
            return <Loading />;
        }

        if (page === 'login') {
            return <div className="loginForm"><LoginForm/></div>;
        }

        if (page === 'register') {
            return <div className="loginForm"><RegistrationForm/></div>;
        }

        if (page === 'main') {
            return (
                <React.Fragment>
                    <Header userName={userName}/>
                    <div className='main'>
                        <CreatePersons
                            idChange = {this.idChange}
                            fnameChange = {this.fnameChange}
                            lnameChange = {this.lnameChange}
                            ageChange = {this.ageChange}
                            id = {id}
                            fname = {fname}
                            lname = {lname}
                            age = {age}
                        />
                        <DataTable arrData = {arrData}/>
                        <Buttons create = {this.create}/>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default App;