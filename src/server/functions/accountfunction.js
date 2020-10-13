import "./treesfunction";
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

module.exports = {
    tokenVerification,
};
