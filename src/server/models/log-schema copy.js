"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const logSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  msg: {
    type: String,
    default: "Something happened"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Log = _mongoose.default.model("Log", logSchema);

module.exports = {
  Log
};
//# sourceMappingURL=log-schema.js.map