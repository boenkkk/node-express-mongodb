module.exports = app => {
    const profiles = require("../controllers/profile.controller.js");

    var router = require("express").Router();

    // Retrieve all
    router.get("/", profiles.findAll);

    // Create
    router.post("/", profiles.create);

    app.use("/api/profiles", router);
};