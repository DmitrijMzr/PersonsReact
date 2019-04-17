import React from 'react';

function CreatePersons(props) {
    const {idChange, fnameChange, lnameChange, ageChange, id, fname, lname, age} = props;
    return(
        <div className="create">
            <input type="number" id="id" className="data__input" min="1" placeholder="Person ID" onChange = {idChange} value = {id}/>
            <input type="text" id="fname" className="data__input" placeholder="First name" onChange = {fnameChange} value = {fname}/>
            <input type="text" id="lname" className="data__input" placeholder="Last name" onChange = {lnameChange} value = {lname}/>
            <input type="number" id="age" className="data__input" placeholder="Age" onChange = {ageChange} value = {age}/>
        </div>
    );
}
export default CreatePersons;