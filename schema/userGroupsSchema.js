const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGroup = new Schema({
    'patientId': String,
    'relativeName':String,
    'relation':String,
    'createdDate':Date
}, { collection: 'UserGroup' });

module.exports = mongoose.model('UserGroup',userGroup);