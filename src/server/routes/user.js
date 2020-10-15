const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

import auth from "../middlewares/authentification";

router.post("/auth/signup", userCtrl.signup);
router.post("/auth/login", userCtrl.login);
router.post("/user/:userId", auth, userCtrl.saveUser);
router.get("/user/:userId", auth, userCtrl.getUserData);
router.get("/auth/:username", userCtrl.checkUsername);
router.get("/auth/:email", userCtrl.checkEmail);

module.exports = router;
