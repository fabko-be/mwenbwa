"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;

const uniqueValidator = require("mongoose-unique-validator");

const commentSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  msg: String
});
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});
const treeSchema = new Schema({
  position: {
    type: pointSchema,
    required: true
  },
  hauteur_totale: {
    type: Number,
    required: true,
    alias: "heigth"
  },
  circonf: {
    type: Number,
    alias: "diameter"
  },
  nom_complet: {
    type: String,
    alias: "specie"
  },
  value: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    unique: true
  },
  isLocked: Boolean,
  buyHistory: [{
    date: Date,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  comments: {
    type: [commentSchema]
  },
  wikiLink: String
});
treeSchema.plugin(uniqueValidator);

const tree = _mongoose.default.model("Trees", treeSchema);

const comment = _mongoose.default.model("Comment", commentSchema);

const point = _mongoose.default.model("Point", pointSchema);

module.exports = {
  tree,
  comment,
  point
};
//# sourceMappingURL=tree-schema.js.map