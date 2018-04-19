const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugPrice = new Schema({
    drugId: Number,
    inventoryId: Number,
    lotNumber: String,
    expiration:Date,
    manufacturer:String,
    destroyDate:Date,
    destroyMethod:String,
    destroyWitness:String,
    destroyNotes:String
}, { collection: 'DrugPrice' });

module.exports = mongoose.model('DrugPrice', drugPrice);

//Database: openemr, Table: erx_drug_paid, Purpose: Table structure
// page: 50