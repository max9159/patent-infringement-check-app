// src/components/InputForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
  const [patentID, setPatentID] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/infringement-check', {
        patentID,
        companyName,
      });
      setResult(response.data);
    } catch (error) {
      setError('Error fetching analysis. Please try again.');
      console.error('Error fetching analysis:', error);
    }
    setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check Infringement'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {result && <AnalysisResult result={result} />}
    </div>
  );
};

const AnalysisResult = ({ result }) => {
  const { analysis_id, patent_id, company_name, analysis_date, top_infringing_products, overall_risk_assessment } = result;

  return (
    <div className="analysis-result">
      <h1>Analysis Result</h1>
      <h4>Query Info:</h4>
      <p><strong>Patent ID:</strong> {patent_id}</p>
      <p><strong>Company Name:</strong> {company_name}</p>
      <p><strong>Analysis Date:</strong> {analysis_date}</p>
      <h4>Top Infringing Products:</h4>
      {top_infringing_products && top_infringing_products.map((product, index) => (
        <div key={index} className="product-card">
          <p><strong>Product Name:</strong> {product.product_name}</p>
          <p><strong>Infringement Likelihood:</strong> {product.infringement_likelihood}</p>
          <p><strong>Relevant Claims:</strong> {product.relevant_claims.join(', ')}</p>
          <p><strong>Explanation:</strong></p>
          <p>{product.explanation}</p>
          <p><strong>Specific Features:</strong></p>
          <ul>
            {product.specific_features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
      <h4>Overall Risk Assessment:</h4>
      <div className='product-card'>
        <p>{overall_risk_assessment}</p>

      </div>
    </div>
  );
};

export default InputForm;
