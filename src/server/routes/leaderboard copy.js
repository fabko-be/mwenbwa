"use strict";

var _express = require("express");

var _leaderboard = _interopRequireDefault(require("../controllers/leaderboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/trees", _leaderboard.default.getLeaderboardByTrees);
router.get("/leaves", _leaderboard.default.getLeaderboardByLeaves);
router.get("/", _leaderboard.default.getAll);
module.exports = router;
//# sourceMappingURL=leaderboard.js.map