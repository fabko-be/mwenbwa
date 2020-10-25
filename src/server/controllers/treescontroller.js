import {Trees} from "../models/trees";
import account from "../models/account";
import userFunction from "../functions/accountfunction";
import treeFunction from "../functions/treesfunction";
// import nameByRace from "fantasy-name-generator";

module.exports = {
    // looking for all trees
    async alltrees(req, res) {
        try {
            const treesList = await Trees.find();
            res.send(treesList);
        } catch (error) {
            res.status(400).json({message: "Impossible to list trees"});
        }
    },
    async displayTrees(req, res) {
        try {
            const {north, south, west, east} = req.headers;
            const treesList = await Trees.find({
                "location.coordinates.1": {$lt: north, $gt: south},
                "location.coordinates.0": {$lt: east, $gt: west},
            }).populate("owner");
            return res.send(treesList);
        } catch {
            return res
                .status(400)
                .json({message: "T'as fait une requête de merde !"});
        }
    },
    // Buy tree
    async buytree(req, res) {
        try {
            const treeName = treeFunction.generateTreeName();
            const tokenVerification = await userFunction.tokenVerification(
                req,
                res,
            );
            const buyer = await account
                .findOne({_id: tokenVerification})
                .populate("trees");
            const choosenTree = await Trees.findOne({_id: req.body.id});
            const buyerTreesList = buyer.trees.map(obj => obj._id);
            // const today = new Date();
            // const date = `${today.getFullYear()}-${
            //     today.getMonth() + 1
            // }-${today.getDate()}`;
            // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
            // const currentDate = `${date} ${time}`;
            const today = new Date();
            const date = `${today.getFullYear()}-${
                today.getMonth() + 1
            }-${today.getDate()}`;
            const hours = today.getHours() + 1;
            const minutes =
                (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
            const seconds =
                (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
            const time = `${hours}:${minutes}:${seconds}`;
            const currentDate = `${date} ${time}`;
            if (buyerTreesList.includes(choosenTree._id)) {
                return res
                    .status(403)
                    .json({message: "You already bought this tree !"});
            }
            if (choosenTree.owner !== null) {
                await account.updateOne(
                    {_id: choosenTree.owner},
                    {
                        $pull: {
                            trees: req.body.id,
                        },
                    },
                );
            }
            await Trees.updateOne(
                {_id: req.body.id},
                {$set: {owner: buyer._id, name: treeName}},
            );
            await Trees.updateOne(
                {_id: req.body.id},
                {$push: {history: {date: currentDate, user: buyer.name}}},
            );
            await account.updateOne(
                {_id: buyer._id},
                {$push: {trees: choosenTree._id}},
            );
            return res.status(200).json({message: "Tree successfully bought"});
        } catch (error) {
            return res.status(400).json({
                error: `Impossible to buy this tree ${error}`,
            });
        }
    },
};
