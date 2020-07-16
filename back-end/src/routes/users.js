const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();

router.get("/:id", user.getUserByID);

//router.get("/:email", user.getUserByEmail);

module.exports = router;