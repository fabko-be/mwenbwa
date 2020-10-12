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
    // async addtreestonewuser(req, res, array, owner) {
    //     try {
    //         const ownerId = await owner;
    //         array.forEach(element => {
    //             const treeToAdd = Trees.updateOne(
    //                 {_id: element.id},
    //                 {
    //                     $set: {owner: ownerId},
    //                 },
    //             );
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
    // async buyNewTree() {
    //     try {
    //         const freeTrees = await Trees.find({owner: null});
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
};
