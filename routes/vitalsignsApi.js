'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const vitalsignsCollection = mongoose.model('VitalSigns');


const storeVitalsignsData = (req, res) => {
    console.log(req.body);
    let vitalSignsObj = {
        'patientId': req.body.patientId,
        'createdDate':new Date(),
        'date': new Date(req.body.date),
        'pulseRate': req.body.pulseRate,
        'bloodPressure': req.body.bloodPressure,
        'bodyTemperature': req.body.bodyTemperature,
        'respirationRate': req.body.respirationRate,
        'doctorName': req.body.doctorName
    }
    let newVitalSignsDocument = new vitalsignsCollection(vitalSignsObj);
    newVitalSignsDocument.save((error, dataCreated) => {
        console.log(error,dataCreated);
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to create record' });
        }
        else {
            res.json(201, dataCreated);
        }
    })
}



const getVitalsignsData = (req, res) => {

    let patientId = req.body.patientId;
    vitalsignsCollection.find({ 'patientId': patientId }, function (err, data) {
        if (err || data == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid Patient Id' });
        } else {
            res.status(200).json(data);
        }
    });
}





module.exports = {
    storeVitalsignsData: storeVitalsignsData,
    getVitalsignsData:getVitalsignsData
}