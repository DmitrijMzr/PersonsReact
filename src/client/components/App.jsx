import React, {Component, Fragment} from "react";

import Header from './persons/header/header';
import CreatePersons from "./persons/createPersons/createPersons";
import DataTable from "./persons/dataTable/dataTable";
import Buttons from "./persons/buttons/buttons";
import LoginForm from "./loginForm/loginForm";
import RegistrationForm from "./registrationForm/registrationForm";
import {requestServerToPerson, requestServerToData, addPersonDataDB} from './logic';
import InputsHeader from "./todoList/headerForm/formToDo";
import Loading from "./loading/loading";
import {ToDoList} from "./todoList/body/listToDo";
import MsgContext from './MsgContext';
import MsgBox from './MsgBox.jsx';
import {logout as sendLogout} from './logic';

class App extends Component {
    state = {
        page: 'pending',
        userName: null,
        arrData: [],
        msgData: {
            msgText: '',
            msgColor: '',
            msgVisibility: 'hidden'
        },
        todoItems: this.props.initItems,
        isHidden: false,
        inputs: {
            id: '',
            fname: '',
            lname: '',
            age: ''
        },
        buttonName: 'TodoList'
    };
    lastIndex = 3;
    timeoutID = null;

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
                this.renderMsg(err, 'red');
            });
    };

    componentDidMount() {
        requestServerToPerson()
            .then(data => {
                if (data.authorized) {
                    this.setState(() => {
                        return {userName: data.userName, page: 'main'};
                    });
                    this.initPersonsData();
                } else {
                    this.setState(() => ({page: 'login'}));
                }
            })
            .catch(() => {
                console.log('sever not found');
            });
    }

    login = data => {
        this.setState(() => ({page: 'main', userName: data}));
        this.initPersonsData();
    };

    hideMsg = () => {
        this.setState(() => ({msgData: {msgVisibility: 'hidden'}}));
    }

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
    }

    idChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.id = value;
            return {inputs};
        });
    }

    fnameChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.fname = value;
            return {inputs};
        });
    }

    lnameChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.lname = value;
            return {inputs};
        });
    }

    ageChange = (e) => {
        const value = e.target.value;
        this.setState(state => {
            const inputs = Object.assign({}, state.inputs);
            inputs.age = value;
            return {inputs};
        });
    }

    create = () => {
        const inputs = {
            personID: parseInt(this.state.inputs.id),
            age: parseInt(this.state.inputs.age),
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
                        this.renderMsg('Data added', 'green');
                        return {arrData};
                    });
                })
                .catch(res => {
                    this.renderMsg(res === undefined ? 'server is unavailable' : res, 'red');
                });
        } else {
            this.renderMsg(...promise);
        }
    }

    toggleButton = () =>{
        this.setState((state) =>{
            if (state.page === 'main'){
                return {page: 'todoList', buttonName: 'Persons'};
            }
            if(state.page === 'todoList'){
                return {page: 'main', buttonName: 'TodoList'};
            }
        });
    }

    addItem = (todoItem) => {
        const arr = this.state.todoItems;
        arr.unshift({
            index: this.lastIndex,
            value: todoItem,
            done: false
        });
        this.setState(() => ({todoItems: arr}));
    }

    removeItem = (itemIndex) => {
        const arr = this.state.todoItems;
        arr.splice(itemIndex, 1);
        this.setState(() => ({todoItems: arr}));
    }

    saveItem = (itemIndex, value) => {
        this.setState(state => {
            const item = this.state.todoItems[itemIndex];
            item.value = value;
            return {todoItems: state.todoItems};
        });
    }

    markTodoDone = (itemIndex) => {
        const arr = this.state.todoItems;
        const todo = this.state.todoItems[itemIndex];
        arr.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? arr.push(todo) : arr.unshift(todo);
        this.setState(() => ({todoItems: arr}));
    }

    hideDoneItem = () =>{
        this.setState(() => ({isHidden: !this.state.isHidden}))
    }

    checkedHide = (item, mode) => {
        let check = true;
        if(item.done === true && mode) {
            check = false;
        }
        return check
    }

    logout = () =>{
        sendLogout()
            .then(() => {
                console.log('logging out success');
                this.setState(() => {
                    return {userName: '', page: 'login'};
                });
            })
            .catch(err => {
                if (err === undefined) {
                    this.renderMsg('cannot logout due to a server error', 'red');
                } else {
                    this.renderMsg(err, 'red');
                }
            });
    }

    render() {
        const {page, userName, arrData} = this.state;
        const {id, fname, lname, age} = this.state.inputs;
        if (page === 'pending') {
            return <Loading />;
        }

        if (page === 'login') {
            return (
                <MsgContext.Provider value = {{renderMsg: this.renderMsg, msgData: this.state.msgData}}>
                <div className="loginForm"><LoginForm login = {this.login}/></div><MsgBox/>
                </MsgContext.Provider>
            );
        }

        if (page === 'register') {
            return <div className="loginForm"><RegistrationForm/></div>;
        }

        if (page === 'main') {
            return (
                <React.Fragment>
                    <button className={'login-form_button'} onClick={this.toggleButton}>{this.state.buttonName}</button>
                    <Header userName={userName} logout={this.logout}/>
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
                        <MsgContext.Provider value = {{renderMsg: this.renderMsg, msgData: this.state.msgData}}>
                            <MsgBox/>
                            <DataTable arrData = {arrData} />
                        </MsgContext.Provider>
                        <Buttons create = {this.create}/>
                    </div>
                </React.Fragment>
            );
        }

        if (page === 'todoList') {
            return (
                <Fragment>
                    <div className={'app'}>
                        <button className={'todo-list_button'} onClick={this.toggleButton}>{this.state.buttonName}</button>
                        <div className="app__todo">
                            <InputsHeader
                                addItem={this.addItem}
                                hideDoneItem={this.hideDoneItem}/><MsgBox/>
                            <ToDoList
                                items={this.state.todoItems}
                                removeItem={this.removeItem}
                                markTodoDone={this.markTodoDone}
                                editItem={this.editItem}
                                saveItem={this.saveItem}
                                isHidden={this.state.isHidden}
                                checkedHide={this.checkedHide}/>

                        </div>
                    </div>
                </Fragment>
        );
        }
    }
}

export default App;