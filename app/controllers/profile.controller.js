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

// Find a single Document with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Profile.findById(id)
        .then(data => {
            if (!data)
                res.status(404)
                    .send({ message: "Not found Profile with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({ message: "Error retrieving Profile with id=" + id });
        });
};

// Update a Profile  by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
  
    const id = req.params.id;
  
    Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Profile with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({ message: "Profile was updated successfully." })
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Profile with id=" + id
            });
        });
};