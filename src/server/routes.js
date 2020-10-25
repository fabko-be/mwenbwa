import express from "express";
import accountcontroller from "./controllers/accountcontroller";
import treescontroller from "./controllers/treescontroller";
const routes = express.Router();
/* ********************************** */
/* User and Account routes definition */
/* ********************************** */
// Get profile
routes.get("/users/me", accountcontroller.accountProfile);
// Create new Account
routes.post("/users/register", accountcontroller.registeraccount);
routes.post("/users/login", accountcontroller.loginaccount);
// Update account
// Update user fields (name, email, password, color)
routes.put("/users/update", accountcontroller.updateaccount);
// Get all users
routes.get("/users/allusers", accountcontroller.allusers);
// Search Account
routes.get("/searchbyname", accountcontroller.retrievebyname);
routes.get("/searchbyemail/:email", accountcontroller.retrievebyemail);
routes.get("/users/:id", accountcontroller.retrievebyid);
// Delete Account
routes.delete("/users/deleteuser", accountcontroller.deletebyid);

/* ********************************** */
/*       Trees routes definition      */
/* ********************************** */

// Consult trees
routes.get("/treeslist", treescontroller.alltrees);
// recup displayble trees
routes.get("/displaytrees", treescontroller.displayTrees);
// routes.get("/buytree", treescontroller.buyNewTree);
routes.post("/tree/buytree", treescontroller.buytree);
module.exports = routes;
