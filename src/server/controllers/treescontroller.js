import {Trees} from "../models/trees";

module.exports = {
    async alltrees(req, res) {
        try {
            const treesList = await Trees.find();
            res.send(treesList);
        } catch (error) {
            res.status(400).json({message: "Impossible to list trees"});
        }
    },
};
