const express = require("express");
const bodyParser = require("body-parser");

const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

app.use("/authenticate", authRoute);

async function main() {
    await app.listen(4000);

    console.log("rodando");
}

main();