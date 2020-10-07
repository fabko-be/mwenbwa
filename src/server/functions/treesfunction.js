import {Trees} from "../models/trees";
import {nameByRace} from "fantasy-name-generator";

function generateTreeName() {
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
    console.log(treeFantasyName);
    return treeFantasyName;
}
async function newPlayerTrees() {
    const freeTreesList = await Trees.find({owner: null});
    const totalTrees = 3;
    let pickedUpTrees = 0;
    // const treesToAdd = [];
    for (pickedUpTrees; pickedUpTrees < totalTrees; pickedUpTrees++) {
        const choosenTree = Math.round(
            Math.random() * Math.ceil(freeTreesList.length - 1),
        );
        generateTreeName();
        console.log(freeTreesList[choosenTree]._id);
    }
}

module.exports.newPlayerTrees = newPlayerTrees;
module.exports.generateTreeName = generateTreeName;
