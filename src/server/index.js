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
// import {Trees, Points} from "./models/trees";
// import {ppid} from "process";

dotenv.config();
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const {APP_PORT} = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

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

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", async () => {
//     try {
//         const result = await Trees.find();
//         result.forEach(async element => {
//             await Trees.updateOne(
//                 {_id: element._id},
//                 {
//                     $unset: {
//                         y_phi: {},
//                     },
//                 },
//             );
//         });
//         console.log("fields added");
//     } catch (error) {
//         console.log(error);
//     }
// });

app.use(routes);
app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
