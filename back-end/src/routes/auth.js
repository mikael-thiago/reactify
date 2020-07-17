const express = require("express");

const router = express.Router();

const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticate);
router.get("/callback", auth.callback);
router.get("/refreshToken/:refresh_token", auth.refreshToken);
//router.get("/:email", user.getUserByEmail);

module.exports = router;