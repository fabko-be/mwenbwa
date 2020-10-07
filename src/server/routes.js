import express from "express";
import accountcontroller from "./controllers/accountcontroller";
import treescontroller from "./controllers/treescontroller";
const routes = express.Router();

/* ********************************** */
/* User and Account routes definition */
/* ********************************** */

// Create new Account
routes.post("/register", accountcontroller.registeraccount);

// Update account
// Update user fields (name, email, password, color)
routes.put("/updateuser/:id", accountcontroller.updateaccount);
// Get all users
routes.get("/allusers", accountcontroller.allusers);
// Search Account
routes.get("/searchbyname/:name", accountcontroller.retrievebyname);
routes.get("/searchbyemail/:email", accountcontroller.retrievebyemail);
routes.get("/searchbyid/:id", accountcontroller.retrievebyid);
// Delete Account
routes.delete("/deleteuser/:id", accountcontroller.deletebyid);

/* ********************************** */
/*       Trees routes definition      */
/* ********************************** */

// Consult trees
routes.get("/treeslist", treescontroller.alltrees);
routes.get("/buytree", treescontroller.buyNewTree);

module.exports = routes;
