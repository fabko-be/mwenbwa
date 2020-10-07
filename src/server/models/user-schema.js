import mongoose from "mongoose";
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    totalLeaves: {type: Number},
    color: {type: String},
    startPosition: [],
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
