const express = require("express");
import compression from "compression";
import path from "path";
import mongoose from "mongoose";
import routeTree from "./routes/route-tree";
import userRoutes from "./routes/user";
import statusRoutes from "./routes/status";
import routeLeaderboard from "./routes/leaderboard";
import logRoute from "./routes/log";
import {tree} from "./models/tree-schema";
// import User from "./models/user-schema";

mongoose
    .connect(
        "mongodb+srv://mwenbwa-admin:elLwkqOFuAlPDclQ@mwenbwa-becode.tqoa6.mongodb.net/mwenbwa?retryWrites=true&w=majority",
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
        +-"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
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
app.use("/api/", userRoutes);
app.use("/api/status", statusRoutes);

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
