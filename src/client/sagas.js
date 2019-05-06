
import {takeEvery, put, call, all, apply, select} from 'redux-saga/effects';
import {logout as sendLogout, requestServerToPerson} from "./components/logic";
import types from './action-types';

function* init(action) {
    const renderMsg = action.renderMsg;
    try {
        const data = yield call(requestServerToPerson);
        if (data.authorized) {
            let page = yield call([localStorage, 'getItem'], 'page');
            if (page === undefined) {
                page = 'main';
            }
            yield put({type: types.SET_AND_SAVE_PAGE, payload: page});
            yield put({type: types.SET_USERNAME, payload: data.userName});
        } else {
            yield put({type: types.SET_AND_SAVE_PAGE, payload: 'login'});
        }
    } catch (err) {
        if (err === 'request_error') {
            renderMsg('server error', 'red');
            console.log('server error in saga init');
        } else {
            console.log('error in saga init');
            throw err;
        }
    }
}

function* login(action){
    let page = localStorage.getItem('page');
    if (page === undefined) {
        page = 'main';
    }
    yield put({type: types.SET_AND_SAVE_PAGE, payload: page});
    yield put({type: types.SET_USERNAME, payload: action.payload});
}

function* setAndSavePage(action) {
    const page = action.payload;
    switch (page) {
        case 'pending':
        case 'login':
        case 'register':
            break;
        default:
            yield apply(localStorage, 'setItem', ['page', page]);
    }
    yield put({type: types.SET_PAGE, payload: page});
}

function* toggleButtonSave() {
    const state = yield select();
    let curPage = state.common.page;
    let page;
    let toggleButtonName;
    if (curPage === 'main'){
        page = 'todoList';
        toggleButtonName = 'Persons';
    } else if (curPage === 'todoList'){
        page = 'main';
        toggleButtonName = 'TodoList';
    }
    yield put({type: types.SET_AND_SAVE_PAGE, payload: page});
    yield put({type: types.TOGGLE_BUTTON, payload: toggleButtonName});
}

function* watchLogin(){
    yield takeEvery(types.LOGIN, login);
}

function* watchInit() {
    yield takeEvery(types.INIT, init);
}

function* watchSetAndSavePage() {
    yield takeEvery(types.SET_AND_SAVE_PAGE, setAndSavePage);
}

function* watchToggleButtonSave() {
    yield takeEvery(types.TOGGLE_BUTTON_SAVE, toggleButtonSave);
}

function* rootSaga(){
    yield all([
        watchInit(),
        watchLogin(),
        watchSetAndSavePage(),
        watchToggleButtonSave()
    ]);
}

export default rootSaga;