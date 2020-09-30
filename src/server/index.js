/* becodeorg/mwenbwa
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import express from "express";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import accountcontroller from "./controllers/accountcontroller";
import treescontroller from "./controllers/treescontroller";
// import {ppid} from "process";

dotenv.config();
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const {APP_PORT} = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

// Create new Account
app.post("/register", accountcontroller.registeraccount);

// Update account
// Update user fields (name, email, password, color)
app.put("/updateuser/:id", accountcontroller.updateaccount);
// Update user trees (push new tree into trees array in users collection)
app.put("/updateusertrees/:id", accountcontroller.updatetrees);

// Get all users
app.get("/allusers", accountcontroller.allusers);

// Search Account
app.get("/searchbyname/:name", accountcontroller.retrievebyname);
app.get("/searchbyemail/:email", accountcontroller.retrievebyemail);
app.get("/searchbyid/:id", accountcontroller.retrievebyid);

// Delete Account
app.delete("/deleteuser/:id", accountcontroller.deletebyid);

// Consult trees

app.get("/treeslist", treescontroller.alltrees);

// Connexion to DataBase
try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Mongo connected");
} catch (error) {
    console.log(error);
}
app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
