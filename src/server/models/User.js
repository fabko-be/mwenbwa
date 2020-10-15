"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  color: {
    type: String,
    unique: true,
    required: true
  },
  trees: {
    type: Object
  },
  leaves: {
    type: Number
  }
});
module.exports = _mongoose.default.model("User", UserSchema);
//# sourceMappingURL=user.js.map