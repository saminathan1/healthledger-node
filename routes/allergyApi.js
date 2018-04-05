'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const allergyCollection = mongoose.model('Allergy');


allergyCollection.find().exec(function (err, data) {
    if (data.length === 0) {
        console.log("storing default groups");

        let testData = [{
            'patientId': 'P001',
            'createdDate': new Date(),
            'allergyType': "Tablet Allergy",
            'description': "More tablet results in skin allergy"
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'allergyType': "Injection Allergy",
            'description': "More injection results in skin allergy"
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'allergyType': "Skin Allergy",
            'description': "More tablet results in skin allergy"
        }
        ]

        testData.forEach(function (testData) {
            let newAllergyDocument = new allergyCollection(testData);

            newAllergyDocument.save((error, dataCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        console.log("Allergy data already found")
    }
})

const storeAllergyData = (req, res) => {
    console.log(req.body);

    let allergyObj = {
        'patientId': req.body.patientId,
        'createdDate': new Date(),
        'allergyType': req.body.allergyType,
        'description': req.body.description
    }
    let newAllergyDocument = new allergyCollection(allergyObj);
    newAllergyDocument.save((error, dataCreated) => {
        console.log(error, dataCreated);
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to create record' });
        }
        else {
            res.json(201, dataCreated);
        }
    })
}



const getAllergyData = (req, res) => {

    let patientId = req.body.patientId;
    allergyCollection.find({ 'patientId': patientId }, function (err, data) {
        if (err || data == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid Patient Id' });
        } else {
            res.status(200).json(data);
        }
    });
}





module.exports = {
    storeAllergyData: storeAllergyData,
    getAllergyData: getAllergyData
}