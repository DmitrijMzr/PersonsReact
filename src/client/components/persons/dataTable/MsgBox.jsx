import React, {Component} from 'react';
import MsgContext from '../../MsgContext';

class MsgBox extends Component {
    render() {
        const {msgText, msgColor, msgVisibility} = this.context.msgData;
        const style = {visibility: msgVisibility, color: msgColor};
        return (
            <div id='msgBox' className='msgBox' style = {style}>{msgText}</div>
        );
    };
    static contextType = MsgContext;
}
export default MsgBox;