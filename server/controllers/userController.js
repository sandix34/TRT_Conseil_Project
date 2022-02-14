const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function hashPassword (password) {
   return  bcrypt.hashSync(password, 8);
}

exports.signup = async (req, res, next) => {
    try {
        console.log(req.body);
        const newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: await hashPassword(req.body.password),
            role: req.body.role
        });
        await newUser.save(err => {
            if (err) {
                return res.status(400).json("L'inscription a échoué");
            } else {
                res.json('Inscription ok !');
            }
        })
    } catch (error) {
        next(error);
    }

};