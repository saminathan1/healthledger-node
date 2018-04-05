const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const immunization = new Schema({
    'patientId': String,
    'vaccinationType':String,
    'vaccinatedBy':String,
    'dateOfVaccination':Date,
    'createdDate':Date,
    'description':String
}, { collection: 'Immunization' });

module.exports = mongoose.model('Immunization',immunization);