'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const immunizationCollection = mongoose.model('Immunization');



immunizationCollection.find().exec(function (err, data) {
    if (data.length === 0) {
        console.log("storing default groups");

        let testData = [{
            'patientId': 'P001',
            'createdDate': new Date(),
            'vaccinationType': "Polio vaccination",
            'description': "Vaccination to prevent polio",
            'vaccinatedBy': "Doctor name 1",
            'dateOfVaccination': new Date("12-12-2010"),
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'vaccinationType': "Polio vaccination",
            'description': "Vaccination to prevent polio",
            'vaccinatedBy': "Doctor name 1",
            'dateOfVaccination': new Date("9-9-2011"),
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'vaccinationType': "Polio vaccination",
            'description': "Vaccination to prevent polio",
            'vaccinatedBy': "Doctor name 1",
            'dateOfVaccination': new Date("11-11-2012"),
        }
        ]

        testData.forEach(function (testData) {
            let newImmunizationDocument = new immunizationCollection(testData);

            newImmunizationDocument.save((error, dataCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        // console.log("immunization data already found")
    }
})



const storeImmunizationData = (req, res) => {
    console.log(req.body);
    let immunizationObj = {
        'patientId': req.body.patientId,
        'createdDate': new Date(),
        'vaccinationType': req.body.vaccinationType,
        'description': req.body.description,
        'vaccinatedBy': req.body.vaccinatedBy,
        'dateOfVaccination': new Date(req.body.dateOfVaccination),
    }
    let newImmunizationDocument = new immunizationCollection(immunizationObj);
    newImmunizationDocument.save((error, dataCreated) => {
        console.log(error, dataCreated);
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to create record' });
        }
        else {
            res.json(201, dataCreated);
        }
    })
}



const getImmunizationData = (req, res) => {

    let patientId = req.body.patientId;
    immunizationCollection.find({ 'patientId': patientId }, function (err, data) {
        if (err || data == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid Patient Id' });
        } else {
            res.status(200).json(data);
        }
    });
}





module.exports = {
    storeImmunizationData: storeImmunizationData,
    getImmunizationData: getImmunizationData
}