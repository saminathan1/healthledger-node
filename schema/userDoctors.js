const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctors = new Schema({
    'patientId': String,
    'doctorName':String,
    'department':String,
    'createdDate':Date
}, { collection: 'Doctors' });

module.exports = mongoose.model('Doctors',doctors);