'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.set('port', (process.env.PORT || 3000));


var userSchema = require(path.resolve('./schema/userSchema.js'));
var MedicalDetail = require(path.resolve('./schema/medicationSchema.js'));
var allergySchema = require(path.resolve('./schema/allergySchema.js'));
var immunizationSchema = require(path.resolve('./schema/immunizationSchema.js'));
var laboratorySchema = require(path.resolve('./schema/laboratorySchema.js'));
var radiologySchema = require(path.resolve('./schema/radiologySchema.js'));
var vitalSignsSchema = require(path.resolve('./schema/vitalSignsSchema.js'));
var userGroupsSchema =  require(path.resolve('./schema/userGroupsSchema.js'));
var userDoctorsSchema =  require(path.resolve('./schema/userDoctors.js'));
var userDiagnosticCenterSchema =  require(path.resolve('./schema/userDiagnosticCenters.js'));
var userPharmacySchema =  require(path.resolve('./schema/userPharmacists.js'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/healthledger');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we are connected to database");
});

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,webToken');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/test',function(req,res){
    res.send("Hello world");
})

app.post('/login',require('./routes/userApi').loginUser);
app.post('/signup',require('./routes/userApi').createUser);
app.get('/user/groups',require('./routes/userApi').getUserGroups)
app.get('/user/doctors',require('./routes/userApi').getUserDoctors)
app.get('/user/diagnosticCenters',require('./routes/userApi').getUserDiagnosticCenter)
app.get('/user/pharmacy',require('./routes/userApi').getUserPharmacy)

app.post('/store/medication', require('./routes/medicationApi').storeMedicalData);
app.post('/get/medication', require('./routes/medicationApi').getMedicalData);
app.post('/store/immunization', require('./routes/immunizationApi').storeImmunizationData);
app.post('/get/immunization', require('./routes/immunizationApi').getImmunizationData);
app.post('/store/allergy', require('./routes/allergyApi').storeAllergyData);
app.post('/get/allergy', require('./routes/allergyApi').getAllergyData);
app.post('/store/laboratory', require('./routes/laboratoryApi').storeLaboratoryData);
app.post('/get/laboratory', require('./routes/laboratoryApi').getLaboratoryData);
app.post('/store/radiology', require('./routes/radiologyApi').storeRadiologyData);
app.post('/get/radiology', require('./routes/radiologyApi').getRadiologyData);
app.post('/store/vitalsigns', require('./routes/vitalsignsApi').storeVitalsignsData);
app.post('/get/vitalsigns', require('./routes/vitalsignsApi').getVitalsignsData);

app.listen(app.get('port'), () => {
    console.log('Express server started');
});

module.exports = app