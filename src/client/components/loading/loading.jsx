import React from 'react';

function Loading() {
    const spans = Array(6).map(() => <span/>);
    return(
        <div className="loader">
            {spans}
            <h1>Loading</h1>
        </div>
    );
}
export default Loading;