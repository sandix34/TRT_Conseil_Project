const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET;

async function hashPassword (password) {
   return  bcrypt.hashSync(password, 8);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compareSync(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
    try {
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
        console.log(newUser);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return next(new Error('password does not exist'));

        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('password is not correct'));

        const accessToken = jwt.sign({userId: req.body._id.toString()}, secret, {expiresIn: "1d"}, {algorithm: "HS256"} );

        await User.findByIdAndUpdate(user._id, {accessToken})
        res.status(200).json({
            data: { email: user.email, role: user.role},
            accessToken
        })
        console.log(user);
    } catch (error) {
        next(error);
    }
}