import account from "../models/account";

module.exports = {
    async store(req, res) {
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
            const newAccount = await account.create({
                name,
                email,
                password,
                color,
                trees,
                leaves,
            });
            return res
                .status(200)
                .json({message: `User has been created !${newAccount.json()}`});
        } catch (error) {
            console.log(error);
        }
        return null;
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
};
