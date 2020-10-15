"use strict";

var _express = require("express");

var _treeController = _interopRequireDefault(require("../controllers/tree-controller"));

var _authentification = _interopRequireDefault(require("../middlewares/authentification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post("/", _treeController.default.allTreesByViewport);
router.post("/reset", _treeController.default.resetTrees);
router.post("/update", _treeController.default.updateWiki);
router.get("/:treeId/", _treeController.default.getTreeData);
router.post("/:treeId/buy", _authentification.default, _treeController.default.buyTree);
router.post("/:treeId/buyprice", _authentification.default, _treeController.default.buyPrice);
router.post("/:treeId/lock", _authentification.default, _treeController.default.lockTree);
router.post("/:treeId/lockprice", _authentification.default, _treeController.default.lockPrice);
router.get("/:treeId/comments/", _treeController.default.getComments);
router.post("/:treeId/comments/", _authentification.default, _treeController.default.writeComment);
module.exports = router;
//# sourceMappingURL=route-tree.js.map