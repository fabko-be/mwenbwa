import account from "../models/account";
import bcrypt from "bcryptjs";
import jwt from "../middleware/jwtauth";

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
module.exports = {
    // Création d'un nouvel utilisateur
    async registeraccount(req, res) {
        try {
            const {name, email, password, color, trees, leaves} = req.body;
            const userExist = await account.findOne({name});
            const emailExist = await account.findOne({email});
            const colorExist = await account.findOne({color});
            if (
                name == null ||
                email == null ||
                password == null ||
                color == null
            ) {
                return res.status(400).json({
                    message: "Missing informations to register a new user",
                });
            }

            if (name.length >= 13 || name.length <= 4) {
                return res
                    .status(400)
                    .json({error: "Wrong name (must be between 5 and 12)"});
            }
            if (!EMAIL_REGEX.test(email)) {
                return res.status(400).json({error: "Invalid email adresse"});
            }
            if (!PASSWORD_REGEX.test(password)) {
                return res.status(400).json({
                    error:
                        "Invalid password: must be lenght 4 - 8 caracters and includes 1 number at least",
                });
            }
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
    async loginaccount(req, res) {
        const {email, password} = req.body;

        if (email == null || password == null) {
            return res.status(400).json({message: "Missing parameters !"});
        }
        const accountFound = await account.findOne({email});
        if (accountFound) {
            bcrypt.compare(
                password,
                accountFound.password,
                (errBcrypt, resBcript) => {
                    if (resBcript) {
                        return res.status(201).json({
                            _id: accountFound._id,
                            token: jwt.generateToken(accountFound),
                        });
                    }
                    return res.status(403).json({message: "Invalid password."});
                },
            );
        } else {
            return res.status(404).json({message: "User not found"});
        }
        return null;
    },
    // Modification d'un utilisateur
    async updateaccount(req, res) {
        try {
            const headerToken = req.headers.authorization;
            const accountId = await jwt.getAccountId(headerToken);
            if (accountId < 0) {
                return res
                    .status(400)
                    .json({error: "Wrong token or user is not logged in"});
            }
            const userUpdate = await account.findOne({_id: accountId});
            if (userUpdate) {
                const {name, email, password, color} = req.body;
                const userExist = await account.findOne({name: req.body.name});
                const emailExist = await account.findOne({
                    email: req.body.email,
                });
                const colorExist = await account.findOne({
                    color: req.body.color,
                });
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
                // const hashedPassword = await bcrypt.hash(password, 10);
                // console.log(emailExist);
                if (req.body.name && !userExist) {
                    userUpdate.name = req.body.name;
                }
                if (req.body.email && !emailExist) {
                    if (!EMAIL_REGEX.test(req.body.email)) {
                        return res
                            .status(400)
                            .json({error: "Invalid email adresse"});
                    }
                    userUpdate.email = req.body.email;
                }
                if (req.body.password) {
                    if (!PASSWORD_REGEX.test(req.body.password)) {
                        return res.status(400).json({
                            error:
                                "Invalid password: must be lenght 4 - 8 caracters and includes 1 number at least",
                        });
                    }
                    userUpdate.password = await bcrypt.hash(
                        req.body.password,
                        10,
                    );
                }
                if (req.body.color && !colorExist) {
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
                .json({message: `Impossible to update account ${error}`});
        }
    },
    // Rechercher tous les utilisateurs
    async allusers(req, res) {
        try {
            const allUsers = await account.find();
            res.send(allUsers);
        } catch (error) {
            res.status(500).json({message: "Impossible to list all users"});
        }
    },
    // Rechercher un utilisateur par nom
    async retrievebyname(req, res) {
        try {
            const nameSearch = await account.findOne({name: req.body.name});
            return res.send(nameSearch);
        } catch (error) {
            return res.status(400).json({message: "Can't find user"});
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
            res.status(400).json({message: "Can't find user"});
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
            res.status(400).json({message: "Can't find user"});
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
    async accountProfile(req, res) {
        try {
            const headerToken = req.headers.authorization;
            const accountId = await jwt.getAccountId(headerToken);
            console.log(headerToken);
            console.log(accountId);
            if (accountId < 0) {
                return res.status(400).json({error: "Wrong token"});
            }
            const accountProfile = await account.findOne({
                _id: accountId,
            });
            return res.send(accountProfile);
        } catch (error) {
            return res
                .status(400)
                .json({error: "Impossible to retrieve account"});
        }
    },
};
