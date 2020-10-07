import {Trees} from "../models/trees";
// import {account} from "../models/account";
// import nameByRace from "fantasy-name-generator";

module.exports = {
    // Rechercher tous les arbres
    async alltrees(req, res) {
        try {
            const treesList = await Trees.find();
            res.send(treesList);
        } catch (error) {
            res.status(400).json({message: "Impossible to list trees"});
        }
    },
    async buyNewTree() {
        try {
            const freeTrees = await Trees.find({owner: null});
            console.log(freeTrees.length);
        } catch (error) {
            console.log(error);
        }
    },
};
