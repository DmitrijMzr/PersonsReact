import React, {Component} from 'react';
import InputsHeader from "./headerForm/formToDo";
import {ToDoListItems} from "./body/listToDo";
import MsgBox from "../MsgBox";
import ToggleButton from "../ToggleButton";
import toDoItems from './store';
import Logout from "../Logout";

export default class ToDoList extends Component {
    state = {
        todoItems: toDoItems
    };

    addItem = (todoItem) => {
        const arr = this.state.todoItems;
        arr.unshift({
            index: this.lastIndex,
            value: todoItem,
            done: false
        });
        this.setState(() => ({todoItems: arr}));
    };

    removeItem = (itemIndex) => {
        const arr = this.state.todoItems;
        arr.splice(itemIndex, 1);
        this.setState(() => ({todoItems: arr}));
    };

    saveItem = (itemIndex, value) => {
        this.setState(state => {
            const item = this.state.todoItems[itemIndex];
            item.value = value;
            return {todoItems: state.todoItems};
        });
    };

    markTodoDone = (itemIndex) => {
        const arr = this.state.todoItems;
        const todo = this.state.todoItems[itemIndex];
        arr.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? arr.push(todo) : arr.unshift(todo);
        this.setState(() => ({todoItems: arr}));
    };

    hideDoneItem = () =>{
        this.setState(() => ({isHidden: !this.state.isHidden}))
    };

    checkedHide = (item, mode) => {
        let check = true;
        if(item.done === true && mode) {
            check = false;
        }
        return check
    };

    render(){
        return (
            <React.Fragment>
                <div className={'app'}>
                    <ToggleButton/>
                    <Logout classList="data__button_logout"/>
                    <div className="app__todo">
                        <InputsHeader
                            addItem={this.addItem}
                            hideDoneItem={this.hideDoneItem}/><MsgBox/>
                        <ToDoListItems
                            items={this.state.todoItems}
                            removeItem={this.removeItem}
                            markTodoDone={this.markTodoDone}
                            editItem={this.editItem}
                            saveItem={this.saveItem}
                            isHidden={this.state.isHidden}
                            checkedHide={this.checkedHide}/>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}