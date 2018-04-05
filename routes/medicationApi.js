'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const medicalCollection = mongoose.model('MedicalDetail');

medicalCollection.find().exec(function (err, data) {
    if (data.length === 0) {

        let testData = [{
            'patientId': 'P001',
            'drugName': "New drug 1",
            'drugDescription': "Used for body pain",
            'labelerName': "Labeller 1",
            'shape': "Solid",
            'drugStrength': "20 mg",
            'strengthUnit': "1",
            'drugRoute': "Mouth",
            'beforeFood': "No",
            'dateStarted': new Date("2017-03-01"),
            'dateStopped': new Date("2017-03-11"),
            'pricePerDrug': 20,
            'totalAmount': 180,
            'dailyIntake': "Yes",
            'sideEffect': "No",
            'prescribedBy': "Doctor 1",
            'pharmacyName': "My Pharmacy 1"
        },
        {
            'patientId': 'P001',
            'drugName': "New drug 2",
            'drugDescription': "Used for body pain",
            'labelerName': "Labeller 2",
            'shape': "Solid",
            'drugStrength': "200 mg",
            'strengthUnit': "1",
            'drugRoute': "Mouth",
            'beforeFood': "No",
            'dateStarted': new Date("2017-03-01"),
            'dateStopped': new Date("2017-03-11"),
            'pricePerDrug': 210,
            'totalAmount': 1800,
            'dailyIntake': "Yes",
            'sideEffect': "No",
            'prescribedBy': "Doctor 1",
            'pharmacyName': "My Pharmacy 1"
        },
        {
            'patientId': 'P001',
            'drugName': "New drug 3",
            'drugDescription': "Used for body pain",
            'labelerName': "Labeller 3",
            'shape': "Solid",
            'drugStrength': "150 mg",
            'strengthUnit': "2",
            'drugRoute': "Oinment",
            'beforeFood': "No",
            'dateStarted': new Date("2017-03-01"),
            'dateStopped': new Date("2017-03-11"),
            'pricePerDrug': 200,
            'totalAmount': 200,
            'dailyIntake': "Yes",
            'sideEffect': "No",
            'prescribedBy': "Doctor 1",
            'pharmacyName': "My Pharmacy 1"
        }
        ]

        testData.forEach(function (testData) {
            let newMedicalDocument = new medicalCollection(testData);

            newMedicalDocument.save((error, dataCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        console.log("Imminization data already found")
    }
})

const storeMedicalData = (req, res) => {
    console.log(req.body);
    let medicalObj = {
        'patientId': req.body.patientId,
        'createdDate': new Date(),
        'drugName': req.body.drugName,
        'drugDescription': req.body.drugDescription,
        'labelerName': req.body.labelerName,
        'shape': req.body.shape,
        'drugStrength': req.body.drugStrength,
        'strengthUnit': req.body.strengthUnit,
        'drugRoute': req.body.drugRoute,
        'beforeFood': req.body.beforeFood,
        'dateStarted': new Date(req.body.dateStarted),
        'dateStopped': new Date(req.body.dateStopped),
        'pricePerDrug': req.body.pricePerDrug,
        'totalAmount': req.body.totalAmount,
        'dailyIntake': req.body.dailyIntake,
        'sideEffect': req.body.sideEffect,
        'prescribedBy': req.body.prescribedBy,
        'pharmacyName': req.body.pharmacyName
    }
    let newMedicalDocument = new medicalCollection(medicalObj);
    newMedicalDocument.save((error, dataCreated) => {
        console.log(error, dataCreated);
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to create record' });
        }
        else {
            res.json(201, dataCreated);
        }
    })
}



const getMedicalData = (req, res) => {

    let patientId = req.body.patientId;
    medicalCollection.find({ 'patientId': patientId }, function (err, data) {
        if (err || data == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid Patient Id' });
        } else {
            res.status(200).json(data);
        }
    });
}





module.exports = {
    storeMedicalData: storeMedicalData,
    getMedicalData: getMedicalData
}