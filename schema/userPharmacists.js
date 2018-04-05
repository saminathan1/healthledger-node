const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacy = new Schema({
    'patientId': String,
    'pharmacyName':String,
    'location':String,
    'createdDate':Date
}, { collection: 'Pharmacy' });

module.exports = mongoose.model('Pharmacy',pharmacy);