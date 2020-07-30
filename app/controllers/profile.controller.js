const db = require("../models");
const Profile = db.profiles;

// Retrieve
exports.findAll = (req, res) => {
    const city = req.query.city;
    var condition = city ? { city: { $regex: new RegExp(city), $options: "i" } } : {};

    Profile.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Profiles."
            });
        });
};

// Create and Sace
exports.create = (req, res) => {
    // Validate
    if (!req.body.firstName) {
        res.status(400).send({ message: "First tName can not be empty!" });
        return;
    } else if (!req.body.lastName) {
        res.status(400).send({ message: "Last Name can not be empty!" });
        return;
    }

    // Create
    const profile = new Profile({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city
    });
  
    // Save
    profile
        .save(profile)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Profile."
            });
        });
};
