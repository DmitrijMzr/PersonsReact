import React from 'react';
function Buttons(props) {
    const {create, deletePerson, update} = props;
        return(
             <div className="columnButton">
                 <button id="createBtn" className="data__button" onClick={create}>CREATE</button>
                 <button id="updateBtn" className="data__button" onClick={update}>UPDATE</button>
                 <button id="deleteBtn" className="data__button" onClick={deletePerson}>DELETE</button>
    </div>
)
}
export default Buttons;