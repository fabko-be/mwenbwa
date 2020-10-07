/* eslint-disable no-extra-parens*/
import {Log} from "../models/log-schema";

const nbrLogs = 10;

exports.getLogsByPagination = async (req, res) => {
    try {
        const logs = await Log.find({}, "-__v", {
            skip: req.params.page <= 1 ? 0 : (req.params.page - 1) * nbrLogs,
            limit: nbrLogs,
            sort: "-date",
        }).populate("author", "username -_id");

        const pages = Math.floor((await Log.countDocuments()) / nbrLogs);

        res.status(200).json({pages, logs});
    } catch (e) {
        res.status(500).json({error: e.toString()});
    }
};
