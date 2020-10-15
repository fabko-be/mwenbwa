const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({data: "Tout est ok !"});
});

module.exports = router;
