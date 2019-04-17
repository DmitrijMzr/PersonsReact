import React from 'react';

function DataTable(props) {
    const arrData = props.arrData;
    const elements = arrData.map(element => {
        return (
            <div className='row' key = {element.personID}>
            <div className='col-2'>{element.personID}</div>
            <div className='col-4'>{element.firstName}</div>
            <div className='col-4'>{element.lastName}</div>
            <div className='col-2'>{element.age}</div>
        </div>
        );
    });
    return(
        <div id='data__Table' className='data__table'>
            <h2>Data Table</h2>
            <div id='msgBox' className='msgBox'/>
            <div className='data__table-header'>
                <div className='row'>
                    <div className='col-2'>Person ID</div>
                    <div className='col-4'>First name</div>
                    <div className='col-4'>Last name</div>
                    <div className='col-2'>Age</div>
                </div>
            </div>
            <div className='data__table-body' id='tableBody'>
                {elements}
            </div>
        </div>
    );
}
export default DataTable;