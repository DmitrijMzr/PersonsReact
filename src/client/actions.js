
export const types = Object.freeze({
    SET_PAGE: 'SET_PAGE',
    SET_USERNAME: 'SET_USERNAME',
    INIT: 'INIT'
});
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

export {setPage, setUserName};