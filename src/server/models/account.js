/* eslint-disable unicorn/filename-case */
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    color: {type: String, unique: true, required: true},
    trees: {type: Object},
    leaves: {type: Number},
});
module.exports = mongoose.model("User", UserSchema);
