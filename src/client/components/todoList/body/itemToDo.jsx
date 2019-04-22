import React, {Component} from "react";
import Buttons from '../buttons/buttons'

class ItemToDo extends Component {

    state = {
        isEdit: false,
        renameItem: ''
    }

    onClickClose = () => {
        const index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone = () => {
        const index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    saveItem = () => {
        const index = parseInt(this.props.index);
        this.setState(() => ({renameItem: this.props.item.value}));
        this.props.saveItem(index, this.state.renameItem);
        this.setState(() => ({isEdit: false}))
    }

    editItem = () => {
        this.setState(() => ({renameItem: this.props.item.value}));
        this.setState(() => ({isEdit: true}))
    }

    render() {
        const { item: { done } } = this.props;

        return (
            <div className={'todo-list__item'}>
                <div className={done ? "done" : "undone"} aria-hidden="true">
                    {
                        !this.state.isEdit ? (
                            <div className="todo-list__item-description" onClick={this.onClickDone}>
                                {this.props.item.value}
                            </div>
                        ) : (
                            <div className="todo-list__item-description">
                                <input
                                    type='text'
                                    name='renameItem'
                                    className="todo-list__item-input"
                                    value={this.state.renameItem}
                                    onChange={this.onChange}/>
                            </div>
                        )
                    }
                    <div className="todo-list__item-bttn">
                        <Buttons
                            isEdit={this.state.isEdit}
                            editCallback={this.editItem}
                            saveCallback={this.saveItem}
                            closeCallback={this.onClickClose}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemToDo;