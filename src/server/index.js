/* eslint-disable no-console */
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
import routes from "./routes";
// import {Trees} from "./models/trees";
// import {nameByRace} from "fantasy-name-generator";
// import "./functions/treesfunction.js";
// import {ppid} from "process";

dotenv.config();
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const {APP_PORT} = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send("<h1>Yop on Mwenbwa</h1>");
});

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
// Import api routes
app.use(routes);

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
