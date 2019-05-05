
import types from './action-types';
import {combineReducers} from 'redux';

const commonReducer = (state = {page: 'pending', toggleButtonName: 'TodoList'}, action) => {
    const newState = Object.assign({}, state);
    // if (action.type === types.SET_USERNAME) {
    //     debugger;
    // }
    switch (action.type) {
        case types.SET_PAGE:
            newState.page = action.payload;
            return newState;

        case types.SET_USERNAME:
            newState.userName = action.payload;
            return newState;

        case types.TOGGLE_BUTTON:
            if (state.page === 'main'){
                newState.page = 'todoList';
                newState.toggleButtonName = 'Persons';
            } else if (state.page === 'todoList'){
                newState.page = 'main';
                newState.toggleButtonName = 'TodoList';
            }
            return newState;

        default:
            return state;
    }
};

const userNameSetter = (state = null, action) => {
    switch (action.type) {
        case types.SET_USERNAME:
            return action.payload;

        default:
            return state;
    }
};

const reducer = combineReducers({
    common: commonReducer
});

export default reducer;
