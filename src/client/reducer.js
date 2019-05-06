
import types from './action-types';
import {combineReducers} from 'redux';

const commonReducer = (state = {page: 'pending', toggleButtonName: 'TodoList'}, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case types.SET_PAGE:
            newState.page = action.payload;
            return newState;

        case types.SET_USERNAME:
            newState.userName = action.payload;
            return newState;

        case types.TOGGLE_BUTTON:
            newState.toggleButtonName = action.payload;
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
