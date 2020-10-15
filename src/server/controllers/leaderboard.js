import {tree} from "../models/tree-schema";
import User from "../models/user-schema";

exports.getLeaderboardByTrees = async (_, res) => {
    try {
        const groups = await tree
            .aggregate([{$match: {owner: {$ne: null}}}])
            .sortByCount("$owner")
            .exec();
        const populate = await User.populate(groups, {
            path: "_id",
            select: "username",
        });
        res.status(200).json(populate);
    } catch (e) {
        res.status(400).json({Error: e.toString()});
    }
};

exports.getLeaderboardByLeaves = async (_, res) => {
    try {
        const groups = await User.find({})
            .select("username totalLeaves")
            .sort("-totalLeaves")
            .exec();
        res.status(200).json(groups);
    } catch (e) {
        res.status(400).json({Error: e.toString()});
    }
};

exports.getAll = (_, res) => {
    res.status(200).end();
};
