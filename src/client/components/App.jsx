import React, {Component, Fragment} from "react";

import Header from './header/header';
import CreatePersons from "./createPersons/createPersons";
import DataTable from "./dataTable/dataTable";
import Buttons from "./buttons/buttons";
import LoginForm from "./loginForm/loginForm";
import RegistrationForm from "./registrationForm/registrationForm";
import {requestServerToPerson, requestServerToData, addPersonDataDB} from './logic';
import InputsHeader from "./todoList/headerForm/formToDo";
import Loading from "./loading/loading";
import {ToDoList} from "./todoList/body/listToDo";
import MsgContext from './MsgContext';

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
                    this.setState(() => ({page: 'login'}));
                }
            })
            .catch(() => {
                console.log('sever not found');
            });
    }

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
        this.setState(() => {
            return {inputs: {id: value}};
        });
    }

    fnameChange = (e) => {
        const value = e.target.value;
        this.setState(() => {
            return {inputs: {fname: value}};
        });
    }

    lnameChange = (e) => {
        const value = e.target.value;
        this.setState(() => {
            return {inputs: {lname: value}};
        });
    }

    ageChange = (e) => {
        const value = e.target.value;
        this.setState(() => {
            return {inputs: {age: value}};
        });
    }

    create = () => {
        const inputs = Object.assign(this.state.inputs, this.state.inputs);
        const arrData = this.state.arrData;
        const promise = addPersonDataDB(inputs, arrData);
        if (promise instanceof Promise) {
            promise
                .then(res => {
                    this.setState(() => {
                        arrData.push(inputs);
                        this.renderMsg('Data add', 'green');
                        return {arrData};
                    });
                })
                .catch(res => {
                    this.renderMsg('server is unavailable', 'red');
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
        this.setState(state => {
            return {page: 'login'};
        });
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
                        <DataTable arrData = {arrData} />
                        </MsgContext.Provider>
                        <Buttons create = {this.create}/>
                        <button onClick={this.toggleButton}>{this.state.buttonName}</button>
                    </div>
                </React.Fragment>
            );
        }

        if (page === 'todoList') {
            return (
                <Fragment>
                    <div className={'app'}>
                        <div className="app__todo">
                            <InputsHeader
                                addItem={this.addItem}
                                hideDoneItem={this.hideDoneItem}/>
                            <ToDoList
                                items={this.state.todoItems}
                                removeItem={this.removeItem}
                                markTodoDone={this.markTodoDone}
                                editItem={this.editItem}
                                saveItem={this.saveItem}
                                isHidden={this.state.isHidden}
                                checkedHide={this.checkedHide}/>
                            <button onClick={this.toggleButton}>{this.state.buttonName}</button>

                        </div>
                    </div>
                </Fragment>
        );
        }
    }
}

export default App;