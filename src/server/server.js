const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
let checkUserFlag = false;
let currentUserName = null;
let currentID = null;
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
const dbConnectionConfig = require('./db-connection-config.js');

app.use(express.static('dist'));

function getConnection(){
        return mysql.createConnection(dbConnectionConfig);
}


app.get('/currentUser', (req, res) => {
    res.send(currentUserName === null ? '' : currentUserName);
});

app.post('/login', function (req, res) {
    const errorMsg = {};
    checkUserInDataBase(req.body.login, req.body.password, errorMsg)
        .then(() => {
            if (checkUserFlag) {
                currentUserName = req.body.login;
                res.send('OK');
            } else {
                res.send('some error');
            }
        })
        .catch(err => {
            res.send(err);
        });
    //getIdUser(req);
});

function checkUserInDataBase (login, password) {
    return new Promise((resolve, reject) => {
        const connectionDB = getConnection();
        connectionDB.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            connectionDB.query("SELECT id, password FROM tbLogin where login=?", [login], function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                console.log(result, 'result');
                if (!result.length) {
                    checkUserFlag = false;
                    reject('User not defined, press Registration!');
                } else {
                    if (result[0].password === password) {
                        currentID = result[0].id;
                        console.log(result[0].id, 'user id');
                        checkUserFlag = true;
                        resolve();
                    } else {
                        checkUserFlag = false;
                        reject('Wrong password. Try again or stop trying to hack our service');
                    }
                }
            });
        });
    });

}

app.post('/register', async (req, res) => {
    try {
        const data = await saveDataPersonInLoginTable(req);
        currentUserName = data.login;
        currentID = data.id;
        res.send('OK');
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.send('user is already added');
        } else {
            res.send(err.sqlMessage);
        }
    }
});

function  saveDataPersonInLoginTable(req) {
    return new Promise((resolve, reject) => {
        const {login, password, mail} = req.body;
        const connectionDB = getConnection();

        connectionDB.connect(function (err) {
            if (err) {
                return reject(err);
            }
            console.log("Connected!");
            const sql = `INSERT INTO tblogin (login, password, mail) VALUES (?, ?, '')`;
            const values = [login, password];
            connectionDB.query(sql, values, function (err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Saved data login");
                resolve({login, id: result.insertId});
            });
        });
    });
}

app.get('/clearCurName', (req, res) => {
    currentUserName = null;
    res.send('OK');
});

app.get('/currentData', (req, res) => {
    getUserDataBase(res);
});

function getUserDataBase (res) {
    if (currentID === null) {
        res.send('empty currentID');
        return;
    }
    const connectionDBUpdate = getConnection();
    connectionDBUpdate.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        connectionDBUpdate.query(`SELECT tbperson.personID, tbperson.firstName, tbperson.lastName, tbperson.age FROM tbperson WHERE tbperson.loginID = ?`,[currentID] , function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
    });
}

app.post('/createData', async function (req, res) {
    console.log(req.body, 'req body');
    if(currentID) {
        try {
            const result = await saveDataPersonInPersonTable(req);
            console.log(result, 'resulf of saving');
            res.send(result);
        } catch (e) {
            console.log('error saving data in catch', e);
            res.send(e);
        }
    }
});

function  saveDataPersonInPersonTable(req) {
    return new Promise((resolve, reject) => {
        const connectionDB = getConnection();
        connectionDB.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            console.log(req.body, 'req body before sql');
            const sql = `INSERT INTO tbperson (personID, firstName, lastName, age, loginID) VALUES (?, ?, ?, ?, ?)`;
            console.log(sql, 'sql');
            const values = [req.body.personID, req.body.firstName, req.body.lastName, req.body.age, currentID];
            console.log(values, 'values');
            connectionDB.query(sql, values, function (err, result) {
                let res = '';
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY'){
                        res = 'dup';
                    } else {
                        res = err.sqlMessage;
                    }
                    reject(res);
                    console.log(err, 'error saving data');
                } else {
                    res = 'OK';
                    console.log("Saved data person");
                }
                resolve(res);
            });
        });
    });

}

app.post('/deleteRow', async (req, res) => {
    try{
        const data = await deleteRowPerson(req);
        res.end('OK');
    } catch (err) {
        res.send('err');
    }
});

function deleteRowPerson(req) {
    console.log(req.body, 'body before deleterowpers');
    return new Promise((resolve, reject) => {
        const connectionDB = getConnection();
        connectionDB.connect(function (err) {
            if (err) {
                return reject(err);
            }
            console.log("Connected!");
            const values = [req.body.id, currentID];
            console.log(values, 'deleting values');
            connectionDB.query(`DELETE FROM tbperson WHERE personID = ? AND loginID = ?`, values, function (err, result) {
                console.log(err, 'deleting errors');
                if (err) {
                    return reject(err.sqlMessage);
                }
                resolve();
                console.log(result);
            });
        });
    });
}

app.post('/updateRow', (req, res) => {
    updateRowPerson(req);
    res.end();
});

function updateRowPerson(req) {
    const connectionDB3 = getConnection();
    connectionDB3.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        connectionDB3.query(`UPDATE tbperson SET firstName = "${req.body.firstName}" WHERE personID = "${req.body.id}" AND loginID = "${currentID[0].id}"`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });

    const connectionDB4 = getConnection();
    connectionDB4.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        connectionDB4.query(`UPDATE tbperson SET lastName = "${req.body.lastName}" WHERE personID = "${req.body.id}" AND loginID = "${currentID[0].id}"`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });

    const connectionDB5 = getConnection();
    connectionDB5.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        connectionDB5.query(`UPDATE tbperson SET age = "${req.body.age}" WHERE personID = "${req.body.id}" AND loginID = "${currentID[0].id}"`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
}

// function getIdUser(req) {
//     const connectionIDDB = getConnection();
//     connectionIDDB.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//         connectionIDDB.query(`SELECT id FROM tblogin WHERE login = "${req.body.login}"`, function (err, result, fields) {
//             if (err) throw err;
//             currentID = result;
//             console.log(result);
//         });
//     });
// }

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`));
console.log('hello');




