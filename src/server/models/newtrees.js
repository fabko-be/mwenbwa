"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const mCommentsShcema = new _mongoose.default.Schema({
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
const mTreePoint = new _mongoose.default.Schema({
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
const mTreesSchema = new _mongoose.default.Schema({
  value: {
    type: Number
  },
  criconf: {
    type: Number
  },
  position: {
    type: mTreePoint,
    required: true
  },
  geoloc: {
    lat: {
      type: Number
    },
    lon: {
      type: Number
    }
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
    unique: true,
    alias: "fname"
  },
  x_lambda: {
    type: Number
  },
  y_phi: {
    type: Number
  },
  x_lambert72: {
    type: Number
  },
  y_lambert72: {
    type: Number
  },
  history: {
    date: Date,
    user: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
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
    type: [mCommentsShcema]
  }
});

const Trees = _mongoose.default.model("mtrees", mTreesSchema);

const Points = _mongoose.default.model("mPoints", mTreePoint);

const Comments = _mongoose.default.model("mtreeComments", mCommentsShcema);

module.exports = {
  Trees,
  Points,
  Comments
};
//# sourceMappingURL=newtrees.js.map