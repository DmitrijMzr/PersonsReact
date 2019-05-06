
import types from './action-types';
import todoListReducer from "./components/todoList/reducer";
import {combineReducers} from 'redux';

const commonReducer = (state = {page: 'pending', toggleButtonName: 'TodoList'}, action) => {
    switch (action.type) {
        case types.SET_PAGE:
            return {
                ...state,
                page: action.payload
            };

        case types.SET_USERNAME:
            return {
                ...state,
                userName: action.payload
            };

        case types.TOGGLE_BUTTON:
            return {
                ...state,
                toggleButtonName: action.payload
            };

        default:
            return state;
    }
};

const reducer = combineReducers({
    common: commonReducer,
    todoList: todoListReducer
});

export default reducer;
