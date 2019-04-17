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

export {requestServerToPerson, requestServerToData};