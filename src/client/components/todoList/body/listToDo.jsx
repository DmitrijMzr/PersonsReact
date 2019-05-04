import React from 'react';

import ItemToDo from './itemToDo'

export const ToDoListItems = props => {

    const {
        items,
        removeItem,
        markTodoDone,
        editItem,
        saveItem,
        isHidden,
        checkedHide
    } = props;

    const getRenderedItems = () => {
        return items.map((item, index) => {
            if (checkedHide(item, isHidden)) {
                return <ItemToDo
                    key={index}
                    item={item}
                    index={index}
                    removeItem={removeItem}
                    markTodoDone={markTodoDone}
                    editItem={editItem}
                    saveItem={saveItem}
                />
            }

            return null
        })
    };

    return (
        <div className='todo-list'>
            {getRenderedItems()}
        </div>
    );
};
