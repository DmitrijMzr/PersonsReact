function requestServerToPerson () {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4000/currentUser", true);
    try {
        request.send();
    } catch (e) {
        console.log('server not found')
    }
    return new Promise((resolve, reject) => {
        resolve({authorized: true, userName: 'SomeUser'});
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 && request.status < 300) {
                    let arrResponse = JSON.parse(request.response);
                    if (arrResponse[0] !== void 0) {
                        resolve({authorized: true, userName: arrResponse[0]});
                        //userName.innerHTML = `Hello, ${}!`;
                    } else {
                        console.log('not authorized')
                        //setTimeout(() => resolve({authorized: false}), 5000);
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

function checkID (id, arrData) {
    for (let i = 0; i < arrData.length; i++) {
        if (arrData[i].id === id) {
            return false;
        }
    }
    return true;
}

function addPersonDataDB (inputs, arrData) {
    const {id, fName, lName, age} = inputs;
    if (fName === "" ||
        id === "" ||
        lName === "" ||
        age === "") {
            return renderMsg('Fill in all the fields', 'red');
    } else {
        if(checkID(id, arrData)) {
            const request = new XMLHttpRequest();
            request.open("POST", "http://localhost:4000/createData", true);
            request.setRequestHeader("Content-Type", "application/json");
            const data = JSON.stringify(inputs);
            request.send(data);
            return new Promise((resolve, reject) => {
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status === 200 && request.status < 300) {
                            resolve(JSON.parse(request.responseText));
                        } else {
                            reject();
                        }
                    }
                }
            });

        } else {
            return ['User with input ID already added', 'red'];
        }
    }
}

export {requestServerToPerson, requestServerToData, addPersonDataDB};