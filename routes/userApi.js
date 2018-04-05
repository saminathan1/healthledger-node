'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const UserCollection = mongoose.model('User');
const UserGroupCollection = mongoose.model('UserGroup');
const userDoctorCollection = mongoose.model('Doctors');
const userPharmacyCollection = mongoose.model('Pharmacy');
const userDiagnosticCenterCollection = mongoose.model('DiagnosticCenter');

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');



UserGroupCollection.find().exec(function (err, groups) {
    if (groups.length === 0) {
        console.log("storing default groups");

        let data = [
            { "patientId": 'P001', "relativeName": "Manjunath Thammaiah", 'relation': 'Younger brother', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "relativeName": "Praveen Kumar", 'relation': 'Friend', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "relativeName": "Sujay Kumar", 'relation': 'Cousin brother', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "relativeName": "Priya Srinivasan", 'relation': 'Sister', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "relativeName": "Vivek kumar", 'relation': 'Friend', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "relativeName": "Mahesh Gowda", 'relation': 'Friend', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "relativeName": "Kumar Singh", 'relation': 'Blood relation', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P002', "relativeName": "Janathj manoj", 'relation': 'Friend', 'createdDate': new Date(Date.now()), }
        ]

        data.forEach(function (data) {
            let newGroupsDocument = new UserGroupCollection(data);

            newGroupsDocument.save((error, eventCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        console.log("categories already found")
    }
})


userDoctorCollection.find().exec(function (err, groups) {
    if (groups.length === 0) {
        console.log("storing default groups");

        let data = [
            { "patientId": 'P001', "doctorName": "Doctor1", 'department': 'Specialist1', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "doctorName": "Doctor2", 'department': 'Specialist2', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "doctorName": "Doctor3", 'department': 'Specialist3', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "doctorName": "Doctor4", 'department': 'Specialist4', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P002', "doctorName": "Doctor5", 'department': 'Specialist5', 'createdDate': new Date(Date.now()), }
        ]

        data.forEach(function (data) {
            let newGroupsDocument = new userDoctorCollection(data);

            newGroupsDocument.save((error, eventCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        console.log("categories already found")
    }
})

userPharmacyCollection.find().exec(function (err, groups) {
    if (groups.length === 0) {
        console.log("storing default groups");

        let data = [
            { "patientId": 'P001', "pharmacyName": "Pharmacy 1", 'location': 'location 1', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "pharmacyName": "Pharmacy 2", 'location': 'location 2', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "pharmacyName": "Pharmacy 3", 'location': 'location 3', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "pharmacyName": "Pharmacy 4", 'location': 'location 4', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P002', "pharmacyName": "Pharmacy 5", 'location': 'location 5', 'createdDate': new Date(Date.now()), }
      ]

        data.forEach(function (data) {
            let newGroupsDocument = new userPharmacyCollection(data);

            newGroupsDocument.save((error, eventCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        console.log("categories already found")
    }
})

userDiagnosticCenterCollection.find().exec(function (err, groups) {
    if (groups.length === 0) {
        console.log("storing default groups");

        let data = [
            { "patientId": 'P001', "diagnosticCenterName": "Diagnostic center 1", 'location': 'location 1', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "diagnosticCenterName": "Diagnostic center 2", 'location': 'location 2', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "diagnosticCenterName": "Diagnostic center 3", 'location': 'location 3', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P001', "diagnosticCenterName": "Diagnostic center 4", 'location': 'location 4', 'createdDate': new Date(Date.now()), },
            { "patientId": 'P002', "diagnosticCenterName": "Diagnostic center 5", 'location': 'location 5', 'createdDate': new Date(Date.now()), }
       ]

        data.forEach(function (data) {
            let newGroupsDocument = new userDiagnosticCenterCollection(data);

            newGroupsDocument.save((error, eventCreated) => {
                if (error) {
                    console.log("Error while storing document")
                }
                else {
                    console.log("Document stored")
                }
            })
        })
    } else {
        console.log("categories already found")
    }
})


const createUser = (req, res) => {
    let userId;
    UserCollection.findOne({ 'userEmail': req.body.email }, function (err, user) {
        if (err || user == null) {

            UserCollection.find().sort({ field: 'asc', _id: -1 }).limit(1).exec(function (err, user) {
                if (user.length === 0) {
                    userId = "U001"
                } else {
                    userId = "U00" + (parseInt(user[0].userId.substring(3)) + 1)
                }
                let userObj = {
                    'userId': userId,
                    'userName': req.body.userName,
                    'userEmail': req.body.email,
                    'password': req.body.password
                }
                let UserNewCollection = new UserCollection(userObj);
                UserNewCollection.save((error, userCreated) => {
                    if (error) {
                        res.json(400, { 'status': 'error', 'data': 'Failed to create user' });
                    }
                    else {
                        res.json(201, userCreated);
                    }
                })
            });
        } else {
            res.status(400).json({ 'status': 'error', 'data': "User Already Found" });
        }
    });
}


const loginUser = (req, res) => {

    UserCollection.findOne({ 'userEmail': req.body.userEmail, 'password': cryptr.encrypt(req.body.password) }, function (err, user) {
        if (err || user == null) {
            res.status(400).json({ 'status': 'error', 'data': 'Invalid User/Password' });
        } else {
            res.status(200).json(user.userId);
        }
    });

}

const getUserGroups = (req, res) => {
    UserGroupCollection.find({ 'patientId': 'P001' }).exec(function (err, groups) {
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Error while getting categories' });
        }
        else {
            res.json(200, groups);
        }
    })
}

const getUserDoctors = (req, res) => {
    userDoctorCollection.find({ 'patientId': 'P001' }).exec(function (err, groups) {
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Error while getting categories' });
        }
        else {
            res.json(200, groups);
        }
    })
}
const getUserDiagnosticCenter = (req, res) => {
    userDiagnosticCenterCollection.find({ 'patientId': 'P001' }).exec(function (err, groups) {
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Error while getting categories' });
        }
        else {
            res.json(200, groups);
        }
    })
}
const getUserPharmacy = (req, res) => {
    userPharmacyCollection.find({ 'patientId': 'P001' }).exec(function (err, groups) {
        if (err) {
            res.json(400, { 'status': 'error', 'data': 'Error while getting categories' });
        }
        else {
            res.json(200, groups);
        }
    })
}




module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    getUserGroups: getUserGroups,
    getUserDoctors:getUserDoctors,
    getUserDiagnosticCenter:getUserDiagnosticCenter,
    getUserPharmacy:getUserPharmacy
}