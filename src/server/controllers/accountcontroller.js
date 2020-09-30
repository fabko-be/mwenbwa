import account from "../models/account";
import bcrypt from "bcryptjs";

module.exports = {
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
                .json({message: `Impossible to create account${error}`});
        }
    },
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
    async allusers(req, res) {
        try {
            const users = await account.find();
            res.send(users);
        } catch (error) {
            console.log(error);
        }
    },
    async retrievebyname(req, res) {
        try {
            const nameSearch = await account.findOne({name: req.params.name});
            res.send(nameSearch);
        } catch (error) {
            console.log(error);
        }
    },
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
    async updatetrees(req, res) {
        try {
            const treeExist = await account.findOne({trees: req.body.trees});
            if (treeExist) {
                return res.status(400).json({
                    message: "Tree already exist for this player",
                });
            }
            await account.findOneAndUpdate(
                {id: req.body.id},
                {$push: {trees: req.body.trees}},
            );
            return res
                .status(200)
                .json({message: "Tree(s) successfully added !"});
        } catch (error) {
            return res
                .status(400)
                .json({message: "Impossible to push new tree(s) !"});
        }
    },
};
