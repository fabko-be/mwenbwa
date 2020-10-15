"use strict";

var _authentification = _interopRequireDefault(require("../middlewares/authentification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/auth/signup", userCtrl.signup);
router.post("/auth/login", userCtrl.login);
router.post("/user/:userId", _authentification.default, userCtrl.saveUser);
router.get("/user/:userId", _authentification.default, userCtrl.getUserData);
router.get("/auth/:username", userCtrl.checkUsername);
router.get("/auth/:email", userCtrl.checkEmail);
module.exports = router;
//# sourceMappingURL=user.js.map