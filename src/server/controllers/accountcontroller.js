import {account} from "../models/account";
import bcrypt from "bcryptjs";

module.exports = {
    // Création d'un nouvel utilisateur
    async registeraccount(req, res) {
        try {
            const {name, email, password, color, trees, leaves} = req.body;
            const userExist = await account.findOne({name});
            const emailExist = await account.findOne({email});
            const colorExist = await account.findOne({color});
            if (emailExist) {
                return res.status(400).json({
                    message:
                        "Email already in use ! Maybe you want to connect ?",
                });
            } else if (userExist) {
                return res
                    .status(400)
                    .json({message: "Username already taken !"});
            } else if (colorExist) {
                return res
                    .status(400)
                    .json({message: "This color is already in use !"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await account.create({
                name,
                email,
                password: hashedPassword,
                color,
                trees,
                leaves,
            });
            return res.status(200).json({message: `User has been created !`});
        } catch (error) {
            return res
                .status(400)
                .json({message: `Impossible to create account ${error}`});
        }
    },
    // Modification d'un utilisateur
    async updateaccount(req, res) {
        try {
            const userUpdate = await account.findOne({_id: req.params.id});
            if (userUpdate) {
                const {name, email, password, color} = req.body;

                const userExist = await account.findOne({name});
                const emailExist = await account.findOne({email});
                const colorExist = await account.findOne({color});
                if (emailExist) {
                    return res.status(400).json({
                        message:
                            "Email already in use ! Maybe you want to connect ?",
                    });
                } else if (userExist) {
                    return res
                        .status(400)
                        .json({message: "Username already taken !"});
                } else if (colorExist) {
                    return res
                        .status(400)
                        .json({message: "This color is already in use !"});
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                if (req.body.name) {
                    userUpdate.name = req.body.name;
                }
                if (req.body.email) {
                    userUpdate.email = req.body.email;
                }
                if (req.body.password) {
                    userUpdate.password = hashedPassword;
                }
                if (req.body.color) {
                    userUpdate.color = req.body.color;
                }
                await userUpdate.save({
                    name,
                    email,
                    password,
                    color,
                });
            }
            return res.status(200).json({message: `User has been updated !`});
        } catch (error) {
            return res
                .status(400)
                .json({message: `Impossible to update account${error}`});
        }
    },
    // Rechercher tous les utilisateurs
    async allusers(req, res) {
        try {
            const allUsers = await account.find();
            res.send(allUsers);
        } catch (error) {
            console.log(error);
        }
    },
    // Rechercher un utilisateur par nom
    async retrievebyname(req, res) {
        try {
            const nameSearch = await account.findOne({name: req.params.name});
            res.send(nameSearch);
        } catch (error) {
            console.log(error);
        }
    },
    // Rechercher un utilisateur par email
    async retrievebyemail(req, res) {
        try {
            const emailSearch = await account.findOne({
                email: req.params.email,
            });
            res.send(emailSearch);
        } catch (error) {
            console.log(error);
        }
    },
    // Rechercher un utilisateur par ID
    async retrievebyid(req, res) {
        try {
            const idSearch = await account.findOne({
                _id: req.params.id,
            });
            res.send(idSearch);
        } catch (error) {
            console.log(error);
        }
    },
    // Supprimer un utilisateur
    async deletebyid(req, res) {
        try {
            await account.deleteOne({_id: req.params.id});
            return res
                .status(200)
                .json({message: "Account successfully deleted !"});
        } catch (error) {
            return res.status(404).json({message: "Account doesn't exists !"});
        }
    },
};
