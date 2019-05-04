import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import {watchInit} from './sagas';

import App from "./components/App";
import './style/form.css';
import './style/loading.css';
import './style/main.css';
import './style/App.less';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchInit);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));