
import {types} from './actions';
import {combineReducers} from 'redux';
const pageSetter = (state = 'pending', action) => {
    switch (action.type) {
        case types.SET_PAGE:
            return action.payload;

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
    page: pageSetter,
    userName: userNameSetter
});

export default reducer;
