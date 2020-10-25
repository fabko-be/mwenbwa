import "./treesfunction";
import account from "../models/account";
import jwt from "../middleware/jwtauth";

const tokenVerification = async (req, res) => {
    try {
        const headerToken = req.headers.authorization;
        const accountId = await jwt.getAccountId(headerToken);
        if (accountId < 0) {
            return res
                .status(400)
                .json({error: "Wrong token or user is not logged in"});
        }
        return accountId;
    } catch (err) {
        return res.status(400).json({error: "Impossible to verify Token"});
    }
};
const generateStartLeaves = async (req, res) => {
    try {
        const selectedUsers = await account.find();
        let totalUser = 0;
        let totalLeaves = 0;
        selectedUsers.forEach(user => {
            totalUser++;
            totalLeaves += user.leaves;
        });
        const generatedLeaves = totalLeaves / totalUser;
        if (generatedLeaves === Number) {
            return generatedLeaves;
        }
        return 100;
    } catch (error) {
        return res.status(400).json({
            error: "Impossible to generate start leaves for player",
        });
    }
};
module.exports = {
    tokenVerification,
    generateStartLeaves,
};
