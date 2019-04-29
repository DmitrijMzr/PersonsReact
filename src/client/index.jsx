import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import App from "./components/App";
import toDoItems from "./components/store";
import './style/form.css';
import './style/loading.css';
import './style/main.css';
import './style/App.less';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App initItems = {toDoItems}/>
    </Provider>
    , document.getElementById('root'));