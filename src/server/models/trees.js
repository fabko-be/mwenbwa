import mongoose from "mongoose";
const TreesSchema = new mongoose.Schema({
    name: {type: String},
    criconf: {type: Number},
    geoloc: {
        lat: {type: Number},
        lon: {type: Number},
    },
    hauteur_totale: {type: Number},
    nom_complet: {type: String},
    x_lambda: {type: Number},
    y_phi: {type: Number},
    x_lambert72: {type: Number},
    y_lambert72: {type: Number},
    history: [
        {
            previous_owners: {type: String},
            date: {type: Date},
        },
    ],
    owner: {type: String, default: null},
    lock: {type: Boolean, default: false},
    comments: [
        {
            author: {type: String},
            date: {type: Date, default: Date.now},
            content: {type: String},
        },
    ],
});
module.exports = mongoose.model("Trees", TreesSchema);
