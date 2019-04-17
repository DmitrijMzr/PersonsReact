import React from 'react';
function Buttons() {
        return(
             <div className="columnButton">
                 <button id="createBtn" className="data__button">CREATE</button>
                 <button id="updateBtn" className="data__button">UPDATE</button>
                 <button id="deleteBtn" className="data__button">DELETE</button>
                 <div></div>
                 <button id="saveBtn" className="data__button">Save</button>
                 <button id="clearBtn" className="data__button">Clear</button>
    </div>
)
}
export default Buttons;