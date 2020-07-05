const mysql = require("mysql");
const util = require("util");

createConnection = () => {
    const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "reactify"
    });

    connection.query = util.promisify(connection.query);
    return connection;
}


module.exports = { createConnection }