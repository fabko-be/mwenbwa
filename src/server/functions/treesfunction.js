import {Trees} from "../models/trees";
import {nameByRace} from "fantasy-name-generator";
// Generate tree fantasy name
const generateTreeName = () => {
    const treeGender = ["male", "female"];
    const treeRaces = [
        "angel",
        "darkelf",
        "elf",
        "fairy",
        "highelf",
        "highfairy",
    ];
    const treeGenderChoosen = treeGender[Math.round(Math.random(0, 1))];
    const treeRaceChoosen =
        treeRaces[Math.round(Math.random() * Math.ceil(treeRaces.length - 1))];
    const treeFantasyName = nameByRace(treeRaceChoosen, {
        gender: treeGenderChoosen,
    });
    return treeFantasyName;
};
// Calcul the original tree value !
const calculTreeValue = async treeId => {
    const tree = await Trees.findOne(treeId);
    const treeDiameter = tree.circonf / Math.PI;
    const treeValue = Math.ceil((treeDiameter / 100) * tree.height);
    return treeValue;
};
// Add 3 free trees to new player !
const newPlayerTrees = async () => {
    const freeTreesList = await Trees.find({owner: null});
    const totalTrees = 3;
    let pickedUpTrees = 0;
    const treesToAdd = [];
    // const treeValuePromises = [];
    for (pickedUpTrees; pickedUpTrees < totalTrees; pickedUpTrees++) {
        const choosenTree = Math.round(
            Math.random() * Math.ceil(freeTreesList.length - 1),
        );
        // const treeId = freeTreesList[choosenTree]._id;
        // treeValuePromises.push(calculTreeValue(treeId));
        const findTreeInArray = treesToAdd.includes(
            freeTreesList[choosenTree]._id,
        );
        if (!findTreeInArray) {
            treesToAdd.push({
                id: freeTreesList[choosenTree]._id,
                name: generateTreeName(),
                // value: 0,
            });
        }
    }
    // const treeValuesResolved = await Promise.all(treeValuePromises);
    // for (let i = 0; i <= treesToAdd.length - 1; i++) {
    //     treesToAdd[i].value = treeValuesResolved[i];
    // }
    return treesToAdd;
};

module.exports = {
    generateTreeName,
    calculTreeValue,
    newPlayerTrees,
};
