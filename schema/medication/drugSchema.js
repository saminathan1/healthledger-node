const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugDetail = new Schema({
    drugId: Number,
    drugName: String,
    drugForm: String,
    drugSize:String,
    drugUnit: Number,
    drugRoute:String,
    subsituteDrug:Number, //another drug id
    drugCode:String,
    allowMultiple:String
}, { collection: 'DrugDetail' });

module.exports = mongoose.model('DrugDetail', drugDetail);

//Ref : Database: openemr, Table: drugs, Purpose: Table structure
// page no: 42