const Candidate = require('../model/candidateModel.js');

// Create and Save a new Candidate
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Candidate
  const candidate = new Candidate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNo: req.body.phoneNo,
    applied: req.body.applied,
    rating: req.body.rating
  });
  // Save Candidate in the database
  Candidate.create(candidate, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Candidate."
      });
    else res.json(data);
  });
};

// Retrieve all Candidates
exports.findAll = (req, res) => {
  Candidate.getAll((err, data) => {
    if (err)
      res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Candidates."
      });
    else res.send(data);
  });
};

// Find a single Candidate by Id
exports.findOne = (req, res) => {
  Candidate.findById(req.params.id, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Candidate with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Error retrieving Candidate with id " + req.params.id
            });
        }
    } else res.send(data);
  });
};

// Update a Candidate identified by the id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Candidate.updateById(req.params.id,new Candidate(req.body),(err, data) => {
        if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found Candidate with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                    message: "Error updating Candidate with id " + req.params.id
                    });
                }
            } else res.send(data);
    });
};

// Delete a Candidate with the specified id
exports.delete = (req, res) => {
  Candidate.remove(req.params.id, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Candidate with id ${req.params.id}.`
        });
        } else {
            res.status(500).send({
                message: "Could not delete Candidate with id " + req.params.id
        });
        }
    } else res.send({ message: `Candidate was deleted successfully!` });
  });
};
