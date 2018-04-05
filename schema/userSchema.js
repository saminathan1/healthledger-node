const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    'userId': String,
    'userName':String,
    'userEmail':String,
    'password':String
}, { collection: 'User' });

module.exports = mongoose.model('User',user);