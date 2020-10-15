"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CommentsShcema = new _mongoose.default.Schema({
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now()
  },
  content: {
    type: String
  }
});
const TreePoint = new _mongoose.default.Schema({
  type: {
    type: String,
    enum: ["Point"]
  },
  coordinates: {
    type: [Number]
  }
});
const TreesSchema = new _mongoose.default.Schema({
  value: {
    type: Number
  },
  hauteur_totale: {
    type: Number,
    alias: "height"
  },
  nom_complet: {
    type: String,
    alias: "scname"
  },
  name: {
    type: String,
    alias: "fname"
  },
  history: {
    type: Array,
    default: null,
    sparse: true
  },
  circonf: {
    type: Number
  },
  location: {
    type: TreePoint,
    required: true
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  isLock: {
    type: Boolean,
    default: false
  },
  comments: {
    type: [CommentsShcema]
  }
});

const Trees = _mongoose.default.model("Trees", TreesSchema);

const Points = _mongoose.default.model("Points", TreePoint);

const Comments = _mongoose.default.model("treeComments", CommentsShcema);

module.exports = {
  Trees,
  Points,
  Comments
};
//# sourceMappingURL=trees.js.map