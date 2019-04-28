function requestServerToPerson () {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4000/currentUser", true);
    try {
        request.send();
    } catch (e) {
        console.log('server not found')
    }
    return new Promise((resolve, reject) => {
    /* поменять true на false*/ //resolve({authorized: true, userName: 'SomeUser'});
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 && request.status < 300) {
                    const res = request.responseText;
                    if (res !== '') {
                        resolve({authorized: true, userName: res});
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

function logout () {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4000/clearCurName", true);
    try {
        request.send();
    } catch (e) {
        console.log('server not found')
    }
    return new Promise((resolve, reject) => {
        console.log('promise from logout');
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 && request.status < 300) {
                    const res = request.responseText;
                    if (res === 'OK') {
                        resolve();
                    } else {
                        reject(res);
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
                    if (arrData === 'empty currentID') {
                        reject();
                    }
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
    //debugger;
    return true;
    console.log(id, arrData);
    for (let i = 0; i < arrData.length; i++) {
        if (arrData[i].personID === id) {
            return false;
        }
    }
    return true;
}

function addPersonDataDB (inputs, arrData) {
    if (Object.values(inputs).some(val => val === '')) {
            return renderMsg('Fill in all the fields', 'red');
    } else {
        if(checkID(inputs.personID, arrData)) {
            const request = new XMLHttpRequest();
            request.open("POST", "http://localhost:4000/createData", true);
            console.log('im here')
            request.setRequestHeader("Content-Type", "application/json");
            console.log(inputs, 'inputs before send');
            const data = JSON.stringify(inputs);
            request.send(data);
            return new Promise((resolve, reject) => {
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status === 200 && request.status < 300) {
                            if (request.responseText === 'OK') {
                                resolve(request.responseText);
                            } else {
                                reject(request.responseText);
                            }
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

export {requestServerToPerson, requestServerToData, addPersonDataDB, logout};