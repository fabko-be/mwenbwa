"use strict";

var _treeSchema = require("../models/tree-schema");

var _userSchema = _interopRequireDefault(require("../models/user-schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getLeaderboardByTrees = async (_, res) => {
  try {
    const groups = await _treeSchema.tree.aggregate([{
      $match: {
        owner: {
          $ne: null
        }
      }
    }]).sortByCount("$owner").exec();
    const populate = await _userSchema.default.populate(groups, {
      path: "_id",
      select: "username"
    });
    res.status(200).json(populate);
  } catch (e) {
    res.status(400).json({
      Error: e.toString()
    });
  }
};

exports.getLeaderboardByLeaves = async (_, res) => {
  try {
    const groups = await _userSchema.default.find({}).select("username totalLeaves").sort("-totalLeaves").exec();
    res.status(200).json(groups);
  } catch (e) {
    res.status(400).json({
      Error: e.toString()
    });
  }
};

exports.getAll = (_, res) => {
  res.status(200).end();
};
//# sourceMappingURL=leaderboard.js.map