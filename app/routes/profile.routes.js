module.exports = app => {
    const profiles = require("../controllers/profile.controller.js");

    var router = require("express").Router();

    // Retrieve all
    router.get("/", profiles.findAll);

    // Create
    router.post("/", profiles.create);

    // Retrieve a single Document with id
    router.get("/:id", profiles.findOne);

    // Update a Document with id
    router.put("/:id", profiles.update);

    // Delete a Document with id
    router.delete("/:id", profiles.delete);

    // Delete All Document
    router.delete("/", profiles.deleteAll);

    app.use("/api/profiles", router);
};