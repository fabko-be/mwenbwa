"use strict";

var _userSchema = _interopRequireDefault(require("../models/user-schema"));

var _treeController = require("./tree-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const getStarterLeaves = async (trees = []) => {
  const nbrPlayer = await _userSchema.default.countDocuments();

  if (nbrPlayer === 1) {
    return trees.reduce((acc, {
      value
    }) => acc + value, 0);
  }

  const players = await _userSchema.default.find({});
  let AllLeaves = 0;
  await players.forEach(async player => {
    AllLeaves += player.totalLeaves;
    AllLeaves += await (0, _treeController.getAllCapitalLeaves)(player._id);
  });
  return Math.ceil(AllLeaves / nbrPlayer);
};

exports.signup = (req, res) => {
  let possibleUser = null;
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new _userSchema.default({
      email: req.body.email,
      password: hash,
      username: req.body.username,
      color: req.body.color,
      totalLeaves: 0
    });
    user.save().then(async userCreated => {
      possibleUser = userCreated;
      const trees = await (0, _treeController.getStarterPack)();
      const promises = [];
      trees.forEach(tree => {
        tree.owner = userCreated._id;
        promises.push(tree.save());
      });
      await Promise.all(promises);
      userCreated.startPosition = trees[0].position.coordinates;
      userCreated.totalLeaves = await getStarterLeaves(trees);
      await userCreated.save();
      res.status(201).json({
        message: "Utilisateur créé !"
      });
    }).catch(error => {
      console.log(error);
      res.status(400).json(error.toString());
    });
  }).catch(error => res.status(500).json({
    error
  }));
};

exports.login = (req, res) => {
  getStarterLeaves();

  _userSchema.default.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.status(401).json({
        error: "Utilisateur non trouvé !"
      });
    }

    bcrypt.compare(req.body.password, user.password).then(valid => {
      if (!valid) {
        return res.status(401).json({
          error: "Mot de passe incorrect !"
        });
      }

      const date = new Date();
      date.setDate(date.getDate() + 1);
      res.status(200).json({
        userId: user._id,
        totalLeaves: user.totalLeaves,
        startPosition: user.startPosition,
        token: jwt.sign({
          userId: user._id
        }, "8hQ79YXx4ySOF2toKkRrScxrqY6zeORlkBWzxRYPjcyBVVlTeuVI9x2OyTrVx45", {
          expiresIn: "24h"
        }),
        expiresAt: date
      });
    }).catch(error => res.status(500).json({
      error
    }));
  }).catch(error => res.status(500).json({
    error
  }));
};

exports.checkUsername = (req, res) => {
  _userSchema.default.findOne({
    username: req.params.username
  }).then(user => {
    if (user) {
      res.status(401).json({
        message: "Username not available."
      });
    } else {
      res.status(200).json({
        message: "This username is available."
      });
    }
  }).catch(error => res.status(500).json({
    error
  }));
};

exports.checkEmail = (req, res) => {
  _userSchema.default.findOne({
    email: req.params.email
  }).then(user => {
    if (user) {
      res.status(401).json({
        message: "Email not available."
      });
    } else {
      res.status(200).json({
        message: "This email is available."
      });
    }
  }).catch(error => res.status(500).json({
    error
  }));
};

exports.getUserData = async (req, res) => {
  if (req.userId) {
    try {
      const data = await _userSchema.default.findById(req.userId, "-password -_id -startPosition -__v").exec();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({
        error: e.toString()
      });
    }
  } else {
    res.status(500).json({
      error: "Something happens"
    });
  }
};

exports.saveUser = async (req, res) => {
  if (req.userId) {
    try {
      const userModif = req.body.user;
      await _userSchema.default.findByIdAndUpdate(req.userId, _objectSpread({}, userModif), {
        new: true
      });
      res.status(202).end();
    } catch (e) {
      res.status(500).json({
        error: e.toString()
      });
    }
  }
};
//# sourceMappingURL=user.js.map