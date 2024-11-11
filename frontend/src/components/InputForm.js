// src/components/InputForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
  const [patentID, setPatentID] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/infringement-check', {
        patentID,
        companyName,
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching analysis:', error);
    }
  };

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patent ID:</label>
          <input type="text" value={patentID} onChange={(e) => setPatentID(e.target.value)} required />
        </div>
        <div>
          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <button type="submit">Check Infringement</button>
      </form>
      {result && (
        <div className="result">
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InputForm;
