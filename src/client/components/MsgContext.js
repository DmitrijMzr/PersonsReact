import React from 'react';

const MsgContext = React.createContext({
    renderMsg: () => {},
    msgData: {}
});
export default MsgContext;