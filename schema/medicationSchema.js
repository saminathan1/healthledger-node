const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicalDetail = new Schema({
    'patientId': String,
    'drugName':String,
    'drugDescription':String,
    'labelerName':String,
    'shape':String,
    'drugStrength':String,
    'strengthUnit':String,
    'drugRoute':String,
    'beforeFood':String,
    'dateStarted':Date,
    'dateStopped':Date,
    'pricePerDrug':Number,
    'totalAmount':Number,
    'dailyIntake':String,
    'sideEffect':String,
    'prescribedBy':String,
    'pharmacyName':String
}, { collection: 'MedicalDetail' });

module.exports = mongoose.model('MedicalDetail',medicalDetail);

