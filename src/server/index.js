/* eslint-disable no-console */
/* becodeorg/mwenbwa
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */
/*
import express from "express";
import path from "path";
import {tree} from "./db/models/tree-schema";

import mongoose from "mongoose";

const {APP_PORT} = process.env;

const app = express();

const dbURI =
    "mongodb+srv://USER1:JV4jvvRMEN5xcGDX@cluster-mwenbwa-nsqdi.gcp.mongodb.net/Trees?retryWrites=true&w=majority";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

mongoose
    .connect(dbURI, options)
    .then(() => {
        console.log("Connection DB OK");
    })
    .catch(e => {
        console.log(e);
        process.exit(0);
    });

    
    app.get("/hello", (req, res) => {
        console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
        res.send("Hello, World!");
    });
    
    app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening test on port ${APP_PORT}.`),
    ); */

const mongoose = require("mongoose");
const express = require("express");
import compression from "compression";
import path from "path";

import routeTree from "./routes/route-tree";
import userRoutes from "./routes/user";
import statusRoutes from "./routes/status";
import routeLeaderboard from "./routes/leaderboard";
import logRoute from "./routes/log";

import {tree} from "./models/tree-schema";
import User from "./models/user-schema";

// const corsOptions = {
//     origin: "http://localhost:8080",
// };

mongoose
    .connect(
        "mongodb+srv://USER1:JV4jvvRMEN5xcGDX@cluster-mwenbwa-nsqdi.gcp.mongodb.net/Trees?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(e => {
        console.log(`Connexion à MongoDB échouée !${e}`);
        process.exit();
    });

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    );
    next();
});

app.use(compression());
app.use(express.static(path.resolve(__dirname, "../../bin/client")));
app.use(express.json());

app.use("/trees", routeTree);
app.use("/logs", logRoute);
app.use("/leaderboard", routeLeaderboard);
app.use("/api/", userRoutes); // point d'entrée pour les routes de signup et login
app.use("/api/status", statusRoutes); //permet de vérifier si bien connecté au serveur

module.exports = app;

//Timer 15min part
async function earnleaves() {
    try {
        const treeOwned = await tree
            .aggregate([
                {$match: {owner: {$ne: null}}},
                {$group: {_id: "$owner", value: {$sum: "$value"}}},
            ])
            .exec();

        treeOwned.forEach(async element => {
            const user = await User.findById(element._id).exec();
            user.totalLeaves = user.totalLeaves + element.value;
            user.save();
        });
        setTimeout(earnleaves, 900000);
    } catch (e) {
        console.log(e.toString());
    }
}

setTimeout(earnleaves, 900000); //900000

//Timer 1hour part
async function loseLeaves() {
    const user = await User.find();
    user.forEach(element => {
        element.totalLeaves = Math.ceil(element.totalLeaves / 2);
        element.save();
        console.log(element.totalLeaves);
    });
    setTimeout(loseLeaves, 3600000);
}
setTimeout(loseLeaves, 3600000);
