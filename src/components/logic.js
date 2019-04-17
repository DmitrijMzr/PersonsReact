function requestServerToPerson () {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4000/currentUser", true);
    request.send();
    return new Promise((resolve, reject) => {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 && request.status < 300) {
                    let arrResponse = JSON.parse(request.response);
                    if (arrResponse[0] !== void 0) {
                        resolve({authorized: true, userName: arrResponse[0]});
                        //userName.innerHTML = `Hello, ${}!`;
                    } else {
                        resolve({authorized: false});
                        //userName.innerHTML = `Guest account!`;
                    }
                } else {
                    reject();
                }
            }
        }
    });

}

function requestServerToData () {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4000/currentData", true);
    request.send();
    return new Promise((resolve, reject) => {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 && request.status < 300) {
                    let arrData;
                    try {
                        arrData = JSON.parse(request.response);
                        resolve(arrData);
                    } catch {
                        console.log('wrong json');
                        reject();
                    }
                } else {
                    reject();
                }
            }
        }
    });

}

function checkID () {
    const rowTableBody = tableBody.childNodes;
    for(let i = 0; i < rowTableBody.length; i++) {
        const divCurID = rowTableBody[i];
        if(divCurID.nodeType === 3) {
            continue;
        }
        if(divCurID.firstChild.innerHTML === id.value) {
            return false;
        }
    }
    return true;
}

function addPersonDataDB (inputs) {
    const {id, fName, lName, age} = inputs;
    if (fName === "" ||
        id === "" ||
        lName === "" ||
        age === "") {
            return renderMsg('Fill in all the fields', 'red');
    } else {
        if(checkID()) {
            const request = new XMLHttpRequest();
            const obj = new InputForm(id.value, fName.value, lName.value, age.value);
            request.open("POST", "http://localhost:4000/createData", true);
            request.setRequestHeader("Content-Type", "application/json");
            const data = JSON.stringify(obj);
            request.send(data);
            tableBody.innerHTML = '';
            renderMsg(`Data add`, 'green');
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200 && request.status < 300) {
                        requestServerToData();
                        valueOnInput();
                    }
                }
            }
        } else {
            return renderMsg('User with input ID already added', 'red');
        }
    }
}

export {requestServerToPerson, requestServerToData, addPersonDataDB};