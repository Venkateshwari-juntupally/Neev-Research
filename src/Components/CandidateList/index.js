// CandidateList.js

import React, { useEffect, useState } from 'react';
import './index.css'

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidate data from your backend and set it in the state
    fetch('/candidates')
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
      });
  }, []);

  return (
    <div>
      <h2>Candidate List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name}, {candidate.dob}, {candidate.address}, {candidate.contact}, {candidate.gender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
