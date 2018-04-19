'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const laboratoryCollection = mongoose.model('LaboratoryResult');


laboratoryCollection.find().exec(function (err, data) {
    if (data.length === 0) {
        console.log("storing default groups");


        let testData = [{
            'patientId': 'P001',
            'createdDate': new Date(),
            'recordDate': new Date(),
            'doctorDetails': ['Doctor 1', 'Dcotor 2', 'Doctor 3'],
            'labStaffDetails': ['Staff 1', 'Staff 2', 'Staff 3'],
            'testFor': "Bone fracture",
            'testDescription': "Left leg bone fracture",
            'result': "Yes Fractured"
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'recordDate': new Date(),
            'doctorDetails': ['Doctor 3'],
            'labStaffDetails': ['Staff 1', 'Staff 2', 'Staff 3'],
            'testFor': "Bone fracture",
            'testDescription': "Right leg bone fracture",
            'result': "Yes Fractured"
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'recordDate': new Date(),
            'doctorDetails': ['Doctor 1', 'Doctor 3'],
            'labStaffDetails': ['Staff 1', 'Staff 2'],
            'testFor': "Bone fracture",
            'testDescription': "Left hand bone fracture",
            'result': "No Fractured"
        }
        ]

        testData.forEach(function (testData) {
            let newLaboratoryDocument = new laboratoryCollection(testData);

            newLaboratoryDocument.save((error, dataCreated) => {
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

const storeLaboratoryData = (req, res) => {
    console.log(req.body);
    let laboratoryObj = {
        'patientId': req.body.patientId,
        'createdDate': new Date(),
        'recordDate': new Date(req.body.dateOfVaccination),
        'doctorDetails': req.body.doctorDetails,
        'labStaffDetails': req.body.labStaffDetails,
        'testFor': req.body.testFor,
        'testDescription': req.body.testDescription,
        'result': req.body.result
    }
    let newLaboratoryDocument = new laboratoryCollection(laboratoryObj);
    newLaboratoryDocument.save((error, dataCreated) => {
        console.log(error, dataCreated);
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to create record' });
        }
        else {
            res.json(201, dataCreated);
        }
    })
}



const getLaboratoryData = (req, res) => {

    let patientId = req.body.patientId;
    laboratoryCollection.find({ 'patientId': patientId }, function (err, data) {
        if (err || data == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid Patient Id' });
        } else {
            res.status(200).json(data);
        }
    });
}





module.exports = {
    storeLaboratoryData: storeLaboratoryData,
    getLaboratoryData: getLaboratoryData
}