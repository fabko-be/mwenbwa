/* eslint-disable no-unused-vars, consistent-return, require-atomic-updates */

import User from "../models/user-schema";
import {getStarterPack, getAllCapitalLeaves} from "./tree-controller";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getStarterLeaves = async (trees = []) => {
    const nbrPlayer = await User.countDocuments();
    if (nbrPlayer === 1) {
        return trees.reduce((acc, {value}) => acc + value, 0);
    }

    const players = await User.find({});
    let AllLeaves = 0;
    await players.forEach(async player => {
        AllLeaves += player.totalLeaves;
        AllLeaves += await getAllCapitalLeaves(player._id);
    });
    return Math.ceil(AllLeaves / nbrPlayer);
};

exports.signup = (req, res) => {
    let possibleUser = null;
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                username: req.body.username,
                color: req.body.color,
                totalLeaves: 0,
            });
            user.save()
                .then(async userCreated => {
                    possibleUser = userCreated;

                    const trees = await getStarterPack();
                    const promises = [];
                    trees.forEach(tree => {
                        tree.owner = userCreated._id;
                        promises.push(tree.save());
                    });
                    await Promise.all(promises);
                    userCreated.startPosition = trees[0].position.coordinates;
                    userCreated.totalLeaves = await getStarterLeaves(trees);
                    await userCreated.save();

                    res.status(201).json({message: "Utilisateur créé !"});
                })
                .catch(error => {
                    console.log(error);

                    res.status(400).json(error.toString());
                });
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
    getStarterLeaves();

    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res
                    .status(401)
                    .json({error: "Utilisateur non trouvé !"});
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({error: "Mot de passe incorrect !"});
                    }

                    const date = new Date();
                    date.setDate(date.getDate() + 1);

                    res.status(200).json({
                        userId: user._id,
                        totalLeaves: user.totalLeaves,
                        startPosition: user.startPosition,
                        token: jwt.sign(
                            {userId: user._id},
                            "8hQ79YXx4ySOF2toKkRrScxrqY6zeORlkBWzxRYPjcyBVVlTeuVI9x2OyTrVx45",
                            {expiresIn: "24h"},
                        ),
                        expiresAt: date,
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.checkUsername = (req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            if (user) {
                res.status(401).json({message: "Username not available."});
            } else {
                res.status(200).json({message: "This username is available."});
            }
        })
        .catch(error => res.status(500).json({error}));
};

exports.checkEmail = (req, res) => {
    User.findOne({email: req.params.email})
        .then(user => {
            if (user) {
                res.status(401).json({message: "Email not available."});
            } else {
                res.status(200).json({message: "This email is available."});
            }
        })
        .catch(error => res.status(500).json({error}));
};

exports.getUserData = async (req, res) => {
    if (req.userId) {
        try {
            const data = await User.findById(
                req.userId,
                "-password -_id -startPosition -__v",
            ).exec();
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({error: e.toString()});
        }
    } else {
        res.status(500).json({error: "Something happens"});
    }
};
exports.saveUser = async (req, res) => {
    if (req.userId) {
        try {
            const userModif = req.body.user;
            await User.findByIdAndUpdate(
                req.userId,
                {
                    ...userModif,
                },
                {new: true},
            );
            res.status(202).end();
        } catch (e) {
            res.status(500).json({error: e.toString()});
        }
    }
};
