import React, {Component} from 'react';
import {addPersonDataDB, requestServerToData} from "../logic";
import Header from "../header/header";
import CreatePersons from "./createPersons/createPersons";
import MsgBox from "../MsgBox";
import DataTable from "./dataTable/dataTable";
import Buttons from "./buttons/buttons";
import MsgContext from "../MsgContext";
import ToggleButton from "../ToggleButton";

export default class Persons extends Component {
    state = {
        arrData: [],
        inputs: {
            id: '',
            fname: '',
            lname: '',
            age: ''
        },
    };

    componentDidMount() {
        this.initPersonsData();
    }

    initPersonsData = () => {
        requestServerToData()
            .then(arrData => {
                this.setState(() => {
                    return {arrData};
                });
            })
            .catch(error => {
                let err = '';
                if (error === undefined) {
                    err = 'server error';
                } else {
                    err = error;
                }
                this.context.renderMsg(err, 'red');
            });
    };

    idChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.id = parseInt(value);
            return {inputs};
        });
    };

    fnameChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.fname = value;
            return {inputs};
        });
    };

    lnameChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.lname = value;
            return {inputs};
        });
    };

    ageChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.age = value;
            return {inputs};
        });
    };

    create = () => {
        const inputs = {
            personID: this.state.inputs.id,
            age: this.state.inputs.age,
            firstName: this.state.inputs.fname,
            lastName: this.state.inputs.lname
        };
        console.log(inputs, 'inputs before assign');
        const arrData = this.state.arrData;
        console.log(arrData);
        const promise = addPersonDataDB(inputs, arrData);
        if (promise instanceof Promise) {
            promise
                .then(res => {
                    this.setState(() => {
                        arrData.push(inputs);
                        return {arrData};
                    });
                })
                .catch(res => {
                    let message;
                    switch(res){
                        case undefined:
                            message = 'server is unavailable';
                            break;
                        case 'dup':
                            message = 'id duplication is disallowed here';
                            break;
                        default:
                            message = res;
                    }
                    this.context.renderMsg(message, 'red');
                });
        } else {
            this.context.renderMsg(...promise);
        }
    };

    deletePerson = async () => {
        const id = this.state.inputs.id;
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            };
            const response = await fetch("http://localhost:4000/deleteRow", options);
            if (response.status !== 200) {
                throw 'response error';
            }
            const message = await response.text();
            if (message === 'OK') {
                this.setState(state => {
                    const arrData =  state.arrData.filter(item => item.personID !== id);
                    //debugger;
                    return {arrData};
                });
            } else {
                throw 'message';
            }
        } catch (err) {
            this.context.renderMsg(err, 'red');
        }
    };

    render() {
        const arrData = this.state.arrData;
        const {id, fname, lname, age} = this.state.inputs;
        return (
            <React.Fragment>
                <ToggleButton/>
                <Header/>
                <div className='main'>
                    <MsgBox/>
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
                    <Buttons create = {this.create} deletePerson = {this.deletePerson}/>
                    <DataTable arrData = {arrData} />
                </div>
            </React.Fragment>
        );
    }
    static contextType = MsgContext;
}