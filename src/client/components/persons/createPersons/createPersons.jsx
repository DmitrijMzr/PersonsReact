import React from 'react';

function CreatePersons(props) {
    const {idChange, fnameChange, lnameChange, ageChange, id, fname, lname, age} = props;
    return(
        <div className="create">
            <input type="text" id="id" className="data__input" min="1" placeholder="Person ID" onChange = {idChange} value = {id} autoComplete="off"/>
            <input type="text" id="fname" className="data__input" placeholder="First name" onChange = {fnameChange} value = {fname} autoComplete="off"/>
            <input type="text" id="lname" className="data__input" placeholder="Last name" onChange = {lnameChange} value = {lname} autoComplete="off"/>
            <input type="text" id="age" className="data__input" placeholder="Age" onChange = {ageChange} value = {age} autoComplete="off"/>
        </div>
    );
}
export default CreatePersons;