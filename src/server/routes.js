import express from "express";
import accountcontroller from "./controllers/accountcontroller";
import treescontroller from "./controllers/treescontroller";
const routes = express.Router();

// Create new Account
routes.post("/register", accountcontroller.registeraccount);

// Update account
// Update user fields (name, email, password, color)
routes.put("/updateuser/:id", accountcontroller.updateaccount);
// Update user trees (push new tree into trees array in users collection)
routes.put("/updateusertrees/:id", accountcontroller.updatetrees);

// Get all users
routes.get("/allusers", accountcontroller.allusers);

// Search Account
routes.get("/searchbyname/:name", accountcontroller.retrievebyname);
routes.get("/searchbyemail/:email", accountcontroller.retrievebyemail);
routes.get("/searchbyid/:id", accountcontroller.retrievebyid);

// Delete Account
routes.delete("/deleteuser/:id", accountcontroller.deletebyid);

// Consult trees

routes.get("/treeslist", treescontroller.alltrees);

module.exports = routes;
