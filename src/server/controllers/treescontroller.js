import trees from "../models/trees";

module.exports = {
    async alltrees(req, res) {
        try {
            const treesList = await trees.find();
            res.send(treesList);
        } catch (error) {
            res.status(400).json({message: "Impossible to list trees"});
        }
    },
};
