import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    color: {type: String, unique: true, required: true},
    //TODO:
    // ADD TREES UNIQUE !
    trees: [{type: String}],
    leaves: {type: Number},
});
module.exports = mongoose.model("users", UserSchema);
