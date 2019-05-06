
import types from './action-types';

const setPage = (page) => {
    return {
        type: types.SET_AND_SAVE_PAGE,
        payload: page
    };
};

const setUserName = (userName) => {
    return {
        type: types.SET_USERNAME,
        payload: userName
    };
};

const init = (data) => {
    return {
        type: types.INIT,
        payload: data
    };
};

const toggleButton = () => {
    return {
        type: types.TOGGLE_BUTTON_SAVE,
    };
};

const login = data => {
    return {type: types.LOGIN, payload: data};
};

export {setPage, setUserName, init, toggleButton, login};