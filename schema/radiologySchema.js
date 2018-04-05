const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const radiology = new Schema({
    'patientId': String,
    'createdDate':Date,
    'staffTaken':String,
    'xRayDescription':String,
    'xRayImage':String,
    'xRayName':String,
    'xRayPrice':Number,
    'doctor':String
}, { collection: 'Radiology' });

module.exports = mongoose.model('Radiology',radiology);