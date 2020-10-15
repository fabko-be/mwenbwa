"use strict";

var _newtrees = require("../models/newtrees");

module.exports = {
  async allmtrees(req, res) {
    try {
      const treesList = await _newtrees.Trees.find();
      res.send(treesList);

      for (const element of treesList) {
        fetch(element);
        console.log(element.test);
      }
    } catch (error) {
      res.status(400).json({
        message: "Impossible to list trees"
      });
    }
  }

};
//# sourceMappingURL=newtreescontroller.js.map