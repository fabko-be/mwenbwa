"use strict";

var _trees = require("../models/trees");

var _account = _interopRequireDefault(require("../models/account"));

var _accountfunction = _interopRequireDefault(require("../functions/accountfunction"));

var _treesfunction = _interopRequireDefault(require("../functions/treesfunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  async alltrees(req, res) {
    try {
      const treesList = await _trees.Trees.find();
      res.send(treesList);
    } catch (error) {
      res.status(400).json({
        message: "Impossible to list trees"
      });
    }
  },

  async buytree(req, res) {
    try {
      const treeName = _treesfunction.default.generateTreeName();

      const userId = await _accountfunction.default.tokenVerification(req, res);
      const buyer = await _account.default.findOne({
        _id: userId
      });
      const choosenTree = await _trees.Trees.findOne({
        _id: req.body.id
      });
      const buyerTreesList = buyer.trees.map(obj => obj.id);
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const currentDate = `${date} ${time}`;

      if (buyerTreesList.includes(choosenTree._id)) {
        return res.status(403).json({
          message: "You already bought this tree !"
        });
      }

      await _trees.Trees.updateOne({
        _id: req.body.id
      }, {
        $set: {
          owner: userId,
          name: treeName
        }
      });
      await _trees.Trees.updateOne({
        _id: req.body.id
      }, {
        $push: {
          history: {
            date: currentDate,
            user: userId
          }
        }
      });
      await _account.default.updateOne({
        _id: userId
      }, {
        $push: {
          trees: {
            id: choosenTree._id,
            name: treeName
          }
        }
      });
      return res.status(200).json({
        message: "Tree successfully bought"
      });
    } catch (error) {
      return res.status(400).json({
        error: `Impossible to buy this tree ${error}`
      });
    }
  }

};
//# sourceMappingURL=treescontroller.js.map