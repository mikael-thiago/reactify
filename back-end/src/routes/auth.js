const express = require("express");

const router = express.Router();

const auth = require("../controllers/auth.controller");

router.post("/", auth.authenticate);

//router.get("/:email", user.getUserByEmail);

module.exports = router;