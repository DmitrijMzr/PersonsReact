function InputForm (login, pass) {
    this.password = pass;
    this.login = login;
}

function verify(login, pass) {
    const inputResponse = document.getElementById('response');
    const obj = new InputForm(login, pass);
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    const data = JSON.stringify(obj);
    console.log(data);
    request.send(data);
    return new Promise((resolve, reject) => {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                    if (request.responseText === 'OK') {
                        resolve();
                    } else {
                        console.log(request);
                        inputResponse.value = request.responseText;
                        reject(request.responseText);
                    }
                } else {
                    inputResponse.value = 'exclusively bad request';
                    reject('exclusively bad request');
                }
            }
        }
    });

}

function verifyRegister(login, pass) {
    const inputResponse = document.getElementById('response');
    const obj = new InputForm(login, pass);
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4000/register", true);
    request.setRequestHeader("Content-Type", "application/json");
    const data = JSON.stringify(obj);
    console.log(data, data)
    request.send(data);
    return new Promise((resolve, reject) => {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                    if (request.responseText === 'user is already added') {
                        inputResponse.value = request.responseText;
                        reject(request.responseText);
                    } else {
                        resolve(request.responseText);
                        //window.location.replace("http://localhost:4000/index.html");
                    }
                } else {
                    inputResponse.value = 'exclusively bad request';
                    reject('exclusively bad request');
                }
            }
        }
    });

}

export {InputForm, verify, verifyRegister};