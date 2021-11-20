const express = require('express');
const candidates = require("../controller/candidateController.js");
const router =  express.Router();

// Retrieve all candidates
router.get("/", candidates.findAll);

// Create a new candidate
router.post("/", candidates.create);

// Retrieve a single candidate with id
router.get("/:id", candidates.findOne);

// Update a candidate with id
router.put("/:id", candidates.update);

// Delete a candidate with id
router.delete("/:id", candidates.delete);

module.exports = router;
