const conn = require('../config/conn');

// constructor
const Candidate = function (candidate){
  this.firstName = candidate.firstName;
  this.lastName = candidate.lastName;
  this.phoneNo = candidate.phoneNo;
  this.applied = candidate.applied;
  this.rating = candidate.rating;
};

Candidate.create = (newCandidate, result) => {
    let sql = "INSERT INTO candidates SET ?";
    let qry = conn.query(sql, newCandidate, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newCandidate });
  });
};

Candidate.findById = (id, result) => {
    let sql = `SELECT * FROM candidates WHERE id = ${id}`;
    let qry = conn.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
        console.log("found candidate: ", res[0]);
        result(null, res[0]);
        return;
        }
        // not found Candidate with the id
        result({ kind: "not_found" }, null);
  });
};

Candidate.getAll = (result) => {
    let sql = "SELECT * FROM candidates";
    let qry = conn.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
  });
};

Candidate.updateById = (id, candidate, result) => {
    let sql = "UPDATE candidates SET firstName = ?, lastName = ?, phoneNo = ?, applied = ?, rating = ? WHERE id = ?"
    let qry = conn.query(sql,[candidate.firstName, candidate.lastName, candidate.phoneNo, candidate.applied, candidate.rating, id],(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Candidate with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: id, ...candidate });
    }
  );
};

Candidate.remove = (id, result) => {
    let sql = "DELETE FROM candidates WHERE id = ?";
    let qry = conn.query(sql, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Candidate with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted candidate with id: ", id);
        result(null, res);
  });
};

module.exports = Candidate;
