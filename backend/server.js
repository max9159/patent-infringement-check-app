const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 3001;
const config = require('./app/config'); // Load configuration file
const cors = require('cors');

app.use(cors());
// Enable JSON body parsing
app.use(express.json());

// Load patent data and company products data
let patentData = JSON.parse(fs.readFileSync('./data/patents.json'));
let companyData = JSON.parse(fs.readFileSync('./data/company_products.json'));

// Root endpoint - Confirm service is running for health check
app.get('/', (req, res) => {
  res.send('Patent Infringement Check App Service Running...');
});

// Endpoint to run infringement check
app.post('/infringement-check', async (req, res) => {
  const { patentID, companyName } = req.body;

  if (!patentID || !companyName) {
    return res.status(400).json({ error: 'Patent ID and Company Name are required.' });
  }

  // Fuzzy matching to match company name with dataset
  const matchedCompany = findClosestCompany(companyName);
  if (!matchedCompany) {
    return res.status(404).json({ error: 'Company not found.' });
  }

  // Run infringement check
  const analysis = await runInfringementCheck(patentID, matchedCompany);

  // Return the analysis result
  res.json(analysis);
});

// Endpoint to retrieve saved reports
app.get('/saved-reports', (req, res) => {
  try {
    const savedReports = JSON.parse(fs.readFileSync('./data/saved_reports.json'));
    res.json(savedReports);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve saved reports.' });
  }
});

// Function to run patent infringement check
async function runInfringementCheck(patentID, company) {
  try {
    // Read the prompt template from the file
    const promptTemplate = fs.readFileSync('./data/prompt_template.txt', 'utf8');

    // Find patent details
    const patent = patentData.find(p => p.publication_number === patentID);
    if (!patent) {
      return { error: 'Patent not found.' };
    }

    // Replace placeholders in prompt template
    const patentDetails = JSON.stringify(patent);
    const companyProducts = JSON.stringify(company);

    const prompt = promptTemplate
      .replace('{PATENT_DETAILS}', patentDetails)
      .replace('{COMPANY_PRODUCTS}', companyProducts);

    // Correct OpenAI API request
    const requestBody = {
      model: 'gpt-4o-mini', // Specify the model
      messages: [{
        role: 'user',
        content: prompt,
      }]
    };

    console.log(`RequestBody: ${JSON.stringify(requestBody)}`);

    const response = await axios.post('https://api.openai.com/v1/chat/completions',
      requestBody, {
      headers: { 'Authorization': `Bearer ${config.OPENAI_API_KEY}` }
    });
    const parsingResponse = parseOpenAiApiResponse(response);
    return parsingResponse;

  } catch (error) {
    console.error('Error in analysis:', error);
    return { error: 'Could not complete infringement analysis.' };
  }
}

function parseOpenAiApiResponse(response) {
  let extractContent = response.data.choices[0].message.content;
  // let extractContent = "```json\n{\n  \"analysis_id\": \"1\",\n  \"patent_id\": \"US-RE49889-E1\",\n  \"company_name\": \"Walmart Inc.\",\n  \"analysis_date\": \"2024-10-31\",\n  \"top_infringing_products\": [{\n      \"product_name\": \"Walmart Grocery\",\n      \"infringement_likelihood\": \"High\",\n      \"relevant_claims\": [\"1\", \"20\", \"3\", \"11\", \"24\"],\n      \"explanation\": \"The Walmart Grocery app not only automates the list building process based on digital advertisements but also integrates closely with the patent's claims regarding adding product information directly to a shopping list. This alignment with the patent's focus on combining advertisements and shopping list functionality indicates a high likelihood of infringement.\",\n      \"specific_features\": [\n        \"Automated list building from digital ads\",\n        \"Direct integration of advertised products into shopping lists\",\n        \"User interface for selection of multiple products\",\n        \"Cloud-based storage for shopping lists\",\n        \"Tracking and notifications related to listings\"\n      ]\n    }, {\n      \"product_name\": \"Quick Add from Ads\",\n      \"infringement_likelihood\": \"Moderate\",\n      \"relevant_claims\": [\"1\", \"7\", \"10\", \"40\"],\n      \"explanation\": \"Quick Add from Ads facilitates adding items directly from advertisements, echoing the core functions of the patented technology. However, while it implements some key elements, it may lack the comprehensive integration seen in the Walmart Grocery app, thus presenting a moderate risk of infringement.\",\n      \"specific_features\": [\n        \"Direct advertisement-to-list functionality\",\n        \"Option to add multiple items from ads\",\n        \"Minimal user input requirements for list updating\",\n        \"Integration with existing shopping lists\",\n        \"Real-time updates and tracking from advertisements\"\n      ]\n    }\n  ],\n  \"overall_risk_assessment\": \"High risk of infringement identified, with the Walmart Grocery app significantly mirroring key patent functionalities. The Quick Add from Ads feature also likely infringes, albeit to a lesser extent, due to its focused implementation of certain patented aspects.\"\n}\n```";
  extractContent = extractContent.substring(8, extractContent.length);
  extractContent = extractContent.replace('```', '');
  console.log(`extractContent:${extractContent}`);
  let parsingResponse;
  try {
    parsingResponse = JSON.parse(extractContent);
  } catch (e) {
    console.log(e);
    return { error: 'LLM Response Parsing Error. extractContent:' + extractContent}; 
  }
  return parsingResponse;
}

// Function to find closest matching company name
function findClosestCompany(companyName) {
  // For simplicity, using exact match here - replace with fuzzy logic for real use
  return companyData.companies.find(company => company.name.toLowerCase() === companyName.toLowerCase());
}

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
