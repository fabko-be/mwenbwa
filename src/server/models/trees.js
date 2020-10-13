import mongoose, {Schema} from "mongoose";

const CommentsShcema = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: "users"},
    date: {type: Date, default: Date.now()},
    content: {type: String},
});

const TreePoint = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
    },
    coordinates: {
        type: [Number],
    },
});

const TreesSchema = new mongoose.Schema({
    value: {type: Number},
    hauteur_totale: {type: Number, alias: "height"},
    nom_complet: {type: String, alias: "scname"},
    name: {type: String, alias: "fname"},
    history: [
        {date: Date},
        {user: {type: Schema.Types.ObjectId, ref: "users"}},
    ],
    circonf: {type: Number},
    location: {type: TreePoint, required: true},
    owner: {type: Schema.Types.ObjectId, ref: "users"},
    isLock: {type: Boolean, default: false},
    comments: {type: [CommentsShcema]},
});
const Trees = mongoose.model("Trees", TreesSchema);
const Points = mongoose.model("Points", TreePoint);
const Comments = mongoose.model("treeComments", CommentsShcema);
module.exports = {Trees, Points, Comments};
