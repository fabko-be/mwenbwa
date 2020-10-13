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
    // Buy tree
    async buytree(req, res) {
        try {
            const treeName = treeFunction.generateTreeName();
            const userId = await userFunction.tokenVerification(req, res);
            const buyer = await account.findOne({_id: userId});
            const choosenTree = await Trees.findOne({_id: req.body.id});
            const buyerTreesList = buyer.trees.map(obj => obj.id);
            const today = new Date();
            const date = `${today.getFullYear()}-${
                today.getMonth() + 1
            }-${today.getDate()}`;
            const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
            const currentDate = `${date} ${time}`;
            if (buyerTreesList.includes(choosenTree._id)) {
                return res
                    .status(403)
                    .json({message: "You already bought this tree !"});
            }
            await Trees.updateOne(
                {_id: req.body.id},
                {$set: {owner: userId, name: treeName}},
            );
            await Trees.updateOne(
                {_id: req.body.id},
                {$push: {history: {date: currentDate, user: userId}}},
            );
            await account.updateOne(
                {_id: userId},
                {$push: {trees: {id: choosenTree._id, name: treeName}}},
            );
            return res.status(200).json({message: "Tree successfully bought"});
        } catch (error) {
            return res.status(400).json({
                error: `Impossible to buy this tree ${error}`,
            });
        }
    },
};
