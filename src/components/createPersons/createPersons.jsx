import React from 'react';

function CreatePersons() {
    return(
        <div className="create">
            <input type="number" id="id" className="data__input" min="1" placeholder="Person ID"/>
            <input type="text" id="fname" className="data__input" placeholder="First name"/>
            <input type="text" id="lname" className="data__input" placeholder="Last name"/>
            <input type="number" id="age" className="data__input" placeholder="Age"/>
        </div>
    );
}
export default CreatePersons;