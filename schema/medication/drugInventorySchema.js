const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugInventory = new Schema({
    drugId: Number,
    inventoryId: Number,
    lotNumber: String,
    expiration:Date,
    manufacturer:String,
    destroyDate:Date,
    destroyMethod:String,
    destroyWitness:String,
    destroyNotes:String
}, { collection: 'DrugInventory' });

module.exports = mongoose.model('DrugInventory', drugInventory);

//Database: openemr, Table: drug_inventory, Purpose: Table structure
// page no: 43