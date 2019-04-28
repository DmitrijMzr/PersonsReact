function createTableLogin() {
    const connectionDB = getConnection();

    connectionDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        const sql = "CREATE TABLE IF NOT EXISTS tblogin (\n" +
            "        id INT AUTO_INCREMENT PRIMARY KEY,\n" +
            "        login varchar(100) NOT NULL,\n" +
            "        password varchar(100) NOT NULL,\n" +
            "        mail varchar(100) NOT NULL\n" +
            ")";
        connectionDB.query(sql, function (err, result) {
            if (err) throw err;
            console.log("TableLogin created");
        });
    });
}

function createTablePerson() {
    const connectionDB = getConnection();

    connectionDB.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        const sql = "CREATE TABLE IF NOT EXISTS tbPerson (\n" +
            "        count INT AUTO_INCREMENT PRIMARY KEY NOT NULL,\n" +
            "        personID int NOT NULL,\n" +
            "        firstName varchar(100),\n" +
            "        lastName varchar(100),\n" +
            "        age varchar(100),\n" +
            "        loginID INT NOT NULL,\n" +
            "        FOREIGN KEY (loginID)\n" +
            "        REFERENCES tblogin(id)\n" +
            "        ON DELETE CASCADE " +
            ")";
        connectionDB.query(sql, function (err, result) {
            if (err) throw err;
            console.log("TablePerson created");
        });
    });
}

module.exports = {
    createTableLogin,
    createTablePerson
};