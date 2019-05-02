
import {take, put} from 'redux-saga/effects';
import {requestServerToPerson} from "./components/logic";
import {types} from './actions';

function* init() {
    console.log('im here!');
    try {
        const data = yield requestServerToPerson();
        if (data.authorized) {
            yield put({type: types.SET_PAGE, payload: 'main'});
            yield put({type: types.SET_USERNAME, payload: data.userName});
            //yield this.initPersonsData();
        } else {
            yield put({type: types.SET_PAGE, payload: 'login'});
        }
    } catch (err) {
        if (err === 'request_error') {
            //this.renderMsg('server error', 'red');
            console.log('server error in saga init');
        } else {
            console.log('error in saga init');
            throw err;
        }
    }
}

export function* watchInit() {
    yield take('INIT', init);
}