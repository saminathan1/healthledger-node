const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diagnosticCenter = new Schema({
    'patientId': String,
    'diagnosticCenterName':String,
    'location':String,
    'createdDate':Date
}, { collection: 'DiagnosticCenter' });

module.exports = mongoose.model('DiagnosticCenter',diagnosticCenter);