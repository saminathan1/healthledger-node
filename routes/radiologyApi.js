'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const radiologyCollection = mongoose.model('Radiology');


radiologyCollection.find().exec(function (err, data) {
    if (data.length === 0) {
        console.log("storing default groups");

        let testData = [{
            'patientId': 'P001',
            'createdDate': new Date(),
            'staffTaken': 'Staff name 1',
            'xRayDescription': "Some xRay description 1",
            'xRayImage': "http://www.gstatic.com/webp/gallery/1.jpg",
            'xRayName': "Sample xRay name 1",
            'xRayPrice': 100,
            'doctor': "Doctor Name 1"
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'staffTaken': 'Staff name 2',
            'xRayDescription': "Some xRay description 2",
            'xRayImage': "http://www.gstatic.com/webp/gallery/1.jpg",
            'xRayName': "Sample xRay name 2",
            'xRayPrice': 100,
            'doctor': "Doctor Name 2"
        },
        {
            'patientId': 'P001',
            'createdDate': new Date(),
            'staffTaken': 'Staff name 3',
            'xRayDescription': "Some xRay description 3",
            'xRayImage': "http://www.gstatic.com/webp/gallery/1.jpg",
            'xRayName': "Sample xRay name 3",
            'xRayPrice': 100,
            'doctor': "Doctor Name 3"
        }
        ]

        testData.forEach(function (testData) {
            let newRadiologyDocument = new radiologyCollection(testData);

            newRadiologyDocument.save((error, dataCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        console.log("radiology data already found")
    }
})


const storeRadiologyData = (req, res) => {
    console.log(req.body);
    let radiologyObj = {
        'patientId': req.body.patientId,
        'createdDate': new Date(),
        'staffTaken': req.body.staffTaken,
        'xRayDescription': req.body.xRayDescription,
        'xRayImage': req.body.xRayImage,
        'xRayName': req.body.xRayName,
        'xRayPrice': req.body.xRayPrice,
        'doctor': req.body.doctor
    }
    let newRadiologyDocument = new radiologyCollection(radiologyObj);
    newRadiologyDocument.save((error, dataCreated) => {
        console.log(error, dataCreated);
        if (error) {
            res.json(400, { 'status': 'error', 'data': 'Failed to create record' });
        }
        else {
            res.json(201, dataCreated);
        }
    })
}



const getRadiologyData = (req, res) => {

    let patientId = req.body.patientId;
    radiologyCollection.find({ 'patientId': patientId }, function (err, data) {
        if (err || data == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid Patient Id' });
        } else {
            res.status(200).json(data);
        }
    });
}





module.exports = {
    storeRadiologyData: storeRadiologyData,
    getRadiologyData: getRadiologyData
}