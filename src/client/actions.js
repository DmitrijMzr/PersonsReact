
import types from './action-types';

const setPage = (page) => {
    return {
        type: types.SET_PAGE,
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

const toggleButton = data => {
    return {
        type: types.TOGGLE_BUTTON,
        payload: data
    };
};

export {setPage, setUserName, init, toggleButton};