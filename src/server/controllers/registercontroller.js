"use strict";

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  async store(req, res) {
    try {
      const {
        name,
        email,
        password,
        color
      } = req.body;
      const newUser = await _user.default.create({
        name,
        email,
        password,
        color
      });
      return res.json(newUser);
    } catch (error) {
      console.log("User can't be created");
      console.log(error);
    }
  }

};
//# sourceMappingURL=registercontroller.js.map