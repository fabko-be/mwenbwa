"use strict";

var _account = _interopRequireDefault(require("../models/account"));

var _trees = require("../models/trees");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jwtauth = _interopRequireDefault(require("../middleware/jwtauth"));

var _treesfunction = _interopRequireDefault(require("../functions/treesfunction"));

var _accountfunction = _interopRequireDefault(require("../functions/accountfunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EMAIL_REGEX = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
module.exports = {
  async registeraccount(req, res) {
    try {
      const {
        name,
        email,
        password,
        color,
        leaves
      } = req.body;
      const userExist = await _account.default.findOne({
        name
      });
      const emailExist = await _account.default.findOne({
        email
      });
      const colorExist = await _account.default.findOne({
        color
      });

      if (name == null || email == null || password == null || color == null) {
        return res.status(400).json({
          message: "Missing informations to register a new user"
        });
      }

      if (name.length >= 13 || name.length <= 4) {
        return res.status(400).json({
          error: "Wrong name (must be between 5 and 12)"
        });
      }

      if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({
          error: "Invalid email adresse"
        });
      }

      if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({
          error: "Invalid password: must be lenght 4 - 8 caracters and includes 1 number at least"
        });
      }

      if (emailExist) {
        return res.status(400).json({
          message: "Email already in use ! Maybe you want to connect ?"
        });
      } else if (userExist) {
        return res.status(400).json({
          message: "Username already taken !"
        });
      } else if (colorExist) {
        return res.status(400).json({
          message: "This color is already in use !"
        });
      }

      const hashedPassword = await _bcryptjs.default.hash(password, 10);
      const treesToAdd = await _treesfunction.default.newPlayerTrees();
      await _account.default.create({
        name,
        email,
        password: hashedPassword,
        color,
        trees: treesToAdd,
        leaves
      });
      const userCreated = await _account.default.findOne({
        email
      });
      treesToAdd.forEach(async tree => {
        await _trees.Trees.update({
          _id: tree.id
        }, {
          $set: {
            owner: userCreated._id,
            name: tree.name
          }
        }, {
          multi: true
        });
      });
      return res.status(200).json({
        message: `User has been created !`
      });
    } catch (error) {
      return res.status(400).json({
        message: `Impossible to create account ${error}`
      });
    }
  },

  async loginaccount(req, res) {
    const {
      email,
      password
    } = req.body;

    if (email == null || password == null) {
      return res.status(400).json({
        message: "Missing parameters !"
      });
    }

    const accountFound = await _account.default.findOne({
      email
    });

    if (accountFound) {
      _bcryptjs.default.compare(password, accountFound.password, (errBcrypt, resBcript) => {
        if (resBcript) {
          return res.status(201).json({
            _id: accountFound._id,
            token: _jwtauth.default.generateToken(accountFound)
          });
        }

        return res.status(403).json({
          message: "Invalid password."
        });
      });
    } else {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return null;
  },

  async updateaccount(req, res) {
    try {
      const headerToken = req.headers.authorization;
      const accountId = await _jwtauth.default.getAccountId(headerToken);

      if (accountId < 0) {
        return res.status(400).json({
          error: "Wrong token or user is not logged in"
        });
      }

      const userUpdate = await _account.default.findOne({
        _id: accountId
      });

      if (userUpdate) {
        const {
          name,
          email,
          password,
          color
        } = req.body;
        const userExist = await _account.default.findOne({
          name: req.body.name
        });
        const emailExist = await _account.default.findOne({
          email: req.body.email
        });
        const colorExist = await _account.default.findOne({
          color: req.body.color
        });

        if (emailExist) {
          return res.status(400).json({
            message: "Email already in use ! Maybe you want to connect ?"
          });
        } else if (userExist) {
          return res.status(400).json({
            message: "Username already taken !"
          });
        } else if (colorExist) {
          return res.status(400).json({
            message: "This color is already in use !"
          });
        }

        if (req.body.name && !userExist) {
          userUpdate.name = req.body.name;
        }

        if (req.body.email && !emailExist) {
          if (!EMAIL_REGEX.test(req.body.email)) {
            return res.status(400).json({
              error: "Invalid email adresse"
            });
          }

          userUpdate.email = req.body.email;
        }

        if (req.body.password) {
          if (!PASSWORD_REGEX.test(req.body.password)) {
            return res.status(400).json({
              error: "Invalid password: must be lenght 4 - 8 caracters and includes 1 number at least"
            });
          }

          userUpdate.password = await _bcryptjs.default.hash(req.body.password, 10);
        }

        if (req.body.color && !colorExist) {
          userUpdate.color = req.body.color;
        }

        await userUpdate.save({
          name,
          email,
          password,
          color
        });
      }

      return res.status(200).json({
        message: `User has been updated !`
      });
    } catch (error) {
      return res.status(400).json({
        message: `Impossible to update account ${error}`
      });
    }
  },

  async allusers(req, res) {
    try {
      const allUsers = await _account.default.find();
      res.send(allUsers);
    } catch (error) {
      res.status(500).json({
        message: "Impossible to list all users"
      });
    }
  },

  async retrievebyname(req, res) {
    try {
      const nameSearch = await _account.default.findOne({
        name: req.body.name
      });
      return res.send(nameSearch);
    } catch (error) {
      return res.status(400).json({
        message: "Can't find user"
      });
    }
  },

  async retrievebyemail(req, res) {
    try {
      const emailSearch = await _account.default.findOne({
        email: req.body.email
      });
      res.send(emailSearch);
    } catch (error) {
      res.status(400).json({
        message: "Can't find user"
      });
    }
  },

  async retrievebyid(req, res) {
    try {
      const idSearch = await _account.default.findOne({
        _id: req.body.id
      });
      res.send(idSearch);
    } catch (error) {
      res.status(400).json({
        message: "Can't find user"
      });
    }
  },

  async deletebyid(req, res) {
    try {
      const accountId = await _accountfunction.default.tokenVerification(req, res);
      const userToDelete = await _account.default.findOne({
        _id: accountId
      });
      const treesOfUser = userToDelete.trees;
      const treesId = treesOfUser.map(obj => obj.id);
      treesId.forEach(async tree => {
        await _trees.Trees.updateOne({
          _id: tree
        }, {
          $set: {
            owner: null,
            name: null
          }
        }, {
          multi: true
        });
      });
      await _account.default.deleteOne({
        _id: accountId
      });
      return res.status(200).json({
        message: "Account successfully deleted !"
      });
    } catch (error) {
      return res.status(404).json({
        message: "Account doesn't exists !"
      });
    }
  },

  async accountProfile(req, res) {
    try {
      const headerToken = req.headers.authorization;
      const accountId = await _jwtauth.default.getAccountId(headerToken);

      if (accountId < 0) {
        return res.status(400).json({
          error: "Wrong token"
        });
      }

      const accountProfile = await _account.default.findOne({
        _id: accountId
      });
      return res.send(accountProfile);
    } catch (error) {
      return res.status(400).json({
        error: "Impossible to retrieve account"
      });
    }
  }

};
//# sourceMappingURL=accountcontroller.js.map