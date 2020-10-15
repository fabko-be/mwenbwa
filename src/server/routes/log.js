"use strict";

var _express = require("express");

var _log = _interopRequireDefault(require("../controllers/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/:page", _log.default.getLogsByPagination);
module.exports = router;
//# sourceMappingURL=log.js.map