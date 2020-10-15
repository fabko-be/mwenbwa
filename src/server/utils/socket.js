import socket from "socket.io";
import {tree} from "../models/tree-schema";
import User from "../models/user-schema";

module.exports.listen = app => {
    const io = socket.listen(app);

    const treeChannel = io.of("/trees");
    tree.watch().on("change", treeUpdated => {
        treeChannel.emit("tree.updated", {
            updatedTree: treeUpdated.documentKey,
        });
    });

    const leavesChannel = io.of("/leaves");
    User.watch({}, {fullDocument: "updateLookup"}).on("change", userUpdated => {
        if (
            userUpdated.operationType === "update" &&
            userUpdated.updateDescription.updatedFields.totalLeaves
        ) {
            leavesChannel.emit(userUpdated.documentKey._id, {
                totalLeaves:
                    userUpdated.updateDescription.updatedFields.totalLeaves,
            });
        }
    });
};
