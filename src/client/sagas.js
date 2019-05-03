
import {takeEvery, put, call} from 'redux-saga/effects';
import {requestServerToPerson} from "./components/logic";
import {types} from './actions';

function* init(action) {
    const _this = action.payload;
    console.log('im here!');
    try {
        const data = yield call(requestServerToPerson);
        if (data.authorized) {
            yield put({type: types.SET_PAGE, payload: 'main'});
            yield put({type: types.SET_USERNAME, payload: data.userName});
            yield _this.initPersonsData();
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
    yield takeEvery('INIT', init);
}