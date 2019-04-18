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
    request.send(data);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status == 200 && request.status < 300) {
                if (request.responseText === 'User not defined, press Registration!') {
                    console.log(request)
                    inputResponse.value = request.responseText;
                } else {
                    window.location.replace("http://localhost:4000/index.html");
                }
            } else {
                inputResponse.value = 'very bad request';
            }
        }
    }
}

export {InputForm, verify};