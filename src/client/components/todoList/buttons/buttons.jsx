import React from 'react';

function Buttons(props) {
    let className = 'todo-list__item-bttn_bttn-' + (!props.isEdit ? 'edit' : 'save');
    let callback = !props.isEdit ? props.editCallback : props.saveCallback;
    let name = !props.isEdit ? 'Edit' : 'Save';
    const disabled = props.isEdit ? 'disabled' : null;

    return (
        <React.Fragment>
            <button type="button"
                    className={className}
                    onClick={callback}>{name}</button>
            <button type="button"
                    className="todo-list__item-bttn_bttn-del"
                    onClick={props.closeCallback}
                    disabled={disabled}>&times;</button>
        </React.Fragment>
    )
}

export default Buttons