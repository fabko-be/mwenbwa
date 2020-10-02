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
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const TreesSchema = new mongoose.Schema({
    value: {type: Number},
    criconf: {type: Number},
    location: {type: TreePoint, required: true},
    geoloc: {
        lat: {type: Number},
        lon: {type: Number},
    },
    hauteur_totale: {type: Number, alias: "height"},
    nom_complet: {type: String, alias: "scname"},
    name: {type: String, unique: true, alias: "fname"},
    x_lambda: {type: Number},
    y_phi: {type: Number},
    x_lambert72: {type: Number},
    y_lambert72: {type: Number},
    history: {date: Date, user: {type: Schema.Types.ObjectId, ref: "users"}},
    owner: {type: Schema.Types.ObjectId, ref: "users"},
    isLock: {type: Boolean, default: false},
    comments: {type: [CommentsShcema]},
});
const Trees = mongoose.model("Trees", TreesSchema);
const Points = mongoose.model("Points", TreePoint);
const Comments = mongoose.model("treeComments", CommentsShcema);
module.exports = {Trees, Points, Comments};
