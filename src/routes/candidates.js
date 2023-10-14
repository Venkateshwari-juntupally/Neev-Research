const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your SQLite database object

// Route to insert candidate data
router.post('/', (req, res) => {
  const { name, dob, address, contact, gender } = req.body;

  const insertQuery = `
    INSERT INTO candidates (name, dob, address, contact, gender)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(insertQuery, [name, dob, address, contact, gender], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Candidate data stored successfully' });
    }
  });
});

// Route to retrieve candidate data by ID
router.get('/:id', (req, res) => {
  const candidateId = req.params.id;

  const selectQuery = 'SELECT * FROM candidates WHERE id = ?';

  db.get(selectQuery, [candidateId], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: 'Candidate not found' });
      }
    }
  });
});

// Route to update candidate data by ID
router.put('/:id', (req, res) => {
  const candidateId = req.params.id;
  const { name, dob, address, contact, gender } = req.body;

  const updateQuery = `
    UPDATE candidates
    SET name = ?, dob = ?, address = ?, contact = ?, gender = ?
    WHERE id = ?
  `;

  db.run(updateQuery, [name, dob, address, contact, gender, candidateId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Candidate data updated successfully' });
    }
  });
});

// Route to delete candidate data by ID
router.delete('/:id', (req, res) => {
  const candidateId = req.params.id;

  const deleteQuery = 'DELETE FROM candidates WHERE id = ?';

  db.run(deleteQuery, [candidateId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Candidate data deleted successfully' });
    }
  });
});

module.exports = router;
