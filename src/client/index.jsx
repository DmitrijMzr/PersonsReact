import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import toDoItems from "./components/store";
import './style/form.css';
import './style/loading.css';
import './style/main.css';
import './style/App.less';

ReactDOM.render(<App initItems = {toDoItems}/>, document.getElementById('root'));