"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.default = void 0;

const _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

const Schema = _mongoose.default.Schema;

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    totalLeaves: {
        type: Number,
    },
    color: {
        type: String,
    },
    startPosition: [],
});
userSchema.plugin(uniqueValidator);

const User = _mongoose.default.model("User", userSchema);

const _default = User;
exports.default = _default;
//# sourceMappingURL=user-schema.js.map
