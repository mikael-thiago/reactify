const express = require("express");

const router = express.Router();

const user = require("../controllers/user.controller");

router.get("/:id", user.getUserByID);

//router.get("/:email", user.getUserByEmail);

module.exports = router;