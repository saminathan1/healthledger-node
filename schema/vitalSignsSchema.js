const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vitalSigns = new Schema({
    'patientId': String,
    'createdDate':Date,
    'date':Date,
    'pulseRate':String,
    'bloodPressure':String,
    'bodyTemperature':String,
    'respirationRate':String,
    'doctorName':String
}, { collection: 'VitalSigns' });

module.exports = mongoose.model('VitalSigns',vitalSigns);