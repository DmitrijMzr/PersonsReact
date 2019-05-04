import React from "react";
import {connect} from 'react-redux';
import {toggleButton} from "../actions";


function ToggleButton(props) {
    return <button className='login-form_button' onClick={props.toggleButton}>{props.buttonName}</button>;
}

function mapStateToProps(state){
    return {
        buttonName: state.common.toggleButtonName
    };
}

export default connect(mapStateToProps, {toggleButton})(ToggleButton);