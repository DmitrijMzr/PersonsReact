import React from 'react';
function Buttons(props) {
    const create = props.create;
        return(
             <div className="columnButton">
                 <button id="createBtn" className="data__button" onClick={create}>CREATE</button>
                 <button id="updateBtn" className="data__button">UPDATE</button>
                 <button id="deleteBtn" className="data__button">DELETE</button>
    </div>
)
}
export default Buttons;