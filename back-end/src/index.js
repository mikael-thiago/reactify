const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/user", userRoute);
app.use("/authenticate", authRoute);

async function main() {
    await app.listen(4000);

    console.log("rodando");
}

main();