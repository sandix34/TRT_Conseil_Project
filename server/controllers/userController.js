const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET;

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
        const accessToken = jwt.sign({userId: newUser._id.toString()}, secret, {expiresIn: "1d"}, {algorithm: "HS256"} );
        newUser.accessToken = accessToken;
        await newUser.save(err => {
            if (err) {
                return res.status(400).json("L'inscription a échoué");
            } else {
                res.json({
                    data: newUser,
                    accessToken
                });
            }
        })
    } catch (error) {
        next(error);
    }
};