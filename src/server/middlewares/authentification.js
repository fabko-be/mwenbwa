const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            "8hQ79YXx4ySOF2toKkRrScxrqY6zeORlkBWzxRYPjcyBVVlTeuVI9x2OyTrVx45",
        );
        const userId = decodedToken.userId;
        req.userId = userId;
        next();
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
