import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    color: {type: String, unique: true, required: true},
    //TODO:
    // ADD TREES UNIQUE !
    trees: {type: Array, default: null, sparse: true},
    leaves: {type: Number, default: 0, sparse: true},
});
module.exports = mongoose.model("users", UserSchema);
