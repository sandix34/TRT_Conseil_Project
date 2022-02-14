const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    password: String,
    email: String
});

const User = mongoose.model('User', userSchema);
console.log(User);

module.exports = User;