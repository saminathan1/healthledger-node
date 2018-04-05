const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allergy = new Schema({
    'patientId': String,
    'allergyType':String,
    'description':String,
    'createdDate':Date
}, { collection: 'Allergy' });

module.exports = mongoose.model('Allergy',allergy);