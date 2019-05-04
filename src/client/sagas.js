
import {takeEvery, put, call} from 'redux-saga/effects';
import {logout as sendLogout, requestServerToPerson} from "./components/logic";
import types from './action-types';

function* init(action) {
    const _this = action.payload;
    console.log('im here!');
    try {
        const data = yield call(requestServerToPerson);
        if (data.authorized) {
            yield put({type: types.SET_PAGE, payload: 'main'});
            yield put({type: types.SET_USERNAME, payload: data.userName});
        } else {
            yield put({type: types.SET_PAGE, payload: 'login'});
        }
    } catch (err) {
        if (err === 'request_error') {
            _this.renderMsg('server error', 'red');
            console.log('server error in saga init');
        } else {
            console.log('error in saga init');
            throw err;
        }
    }
}

export function* watchInit() {
    yield takeEvery(types.INIT, init);
}