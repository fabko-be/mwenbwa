import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

function generateToken(userData) {
    const token = jwt.sign(
        {
            userID: userData._id,
        },
        process.env.JWT_SIGN_SECRET,
    );
    return token;
}

function getAccountId(token) {
    let accountId = -1;
    try {
        const jwtToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
        if (jwtToken != null) {
            accountId = jwtToken.userID;
        }
    } catch (error) {
        return null;
    }
    return accountId;
}

function parseAuthorization(token) {
    return token != null ? token.replace("Bearer ", "") : null;
}

module.exports = {
    generateToken,
    getAccountId,
    parseAuthorization,
};
