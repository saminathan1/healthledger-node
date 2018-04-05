const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labResult = new Schema({
    'patientId': String,
    'recordDate':Date,
    'createdDate':Date,
    'doctorDetails':Array,
    'labStaffDetails':Array,
    'testFor':String,
    'testDescription':String,
    'result':String
}, { collection: 'LaboratoryResult' });

module.exports = mongoose.model('LaboratoryResult',labResult);