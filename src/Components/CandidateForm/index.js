import React, { useState } from 'react';
import './index.css'

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    contact: '',
    gender: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
          setSubmitMessage('Candidate data stored successfully');
          // You can also reset the form here if needed
        } else {
          setSubmitMessage('Error storing candidate data');
        }
      })
      .catch((error) => {
        setSubmitMessage('Error: ' + error.message);
      });
  };

  return (
    <div>
      <h2>Candidate Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="dob" placeholder="Date of Birth" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Information" onChange={handleChange} />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
};

export default CandidateForm;
