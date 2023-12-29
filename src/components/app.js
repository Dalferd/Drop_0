const axios = require('axios');
const userInput = 'Surat';
const apiKey = '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';


const fs = require('fs');

// Function to get parameters for a given city
function getCityParameters(userInput) {
  // Read the JSON file
  const rawData = fs.readFileSync('reasons.json');
  
  // Parse the JSON data
  const citiesData = JSON.parse(rawData);
  
  // Check if the city exists in the data
  if (citiesData.hasOwnProperty(userInput)) {
    return citiesData[userInput];
  } else {
    console.log(`City "${userInput}" not found.`);
    return null;
  }
}

// Example usage

const cityParameters = getCityParameters(userInput);


  // Accessing parameter values
  const parameter1Value = cityParameters.dist_avg_income;
  const parameter2Value = cityParameters.state_avgi;
  const parameter3Value = cityParameters.dist_literacy;
  const parameter4Value = cityParameters.state_avgl;
  const parameter5Value = cityParameters.dist_back;
  const parameter6Value = cityParameters.dist_rural;
    

//   console.log(`Values for ${userInput}:`);
 
  const prompt = `I am giving you 5 parameters for a district in gujrat. You are to highlight 
  in 3 bullet points how can we reduce dropout rates in that district. You have to also use the 
  figures we are providing in your response. You must reason why you are suggesting every point using the data we are providing.
  The parameters are as follows:. You must limit every sentence to 15 words. After responding to the question, you must say "Why?" and then reason using the data we are providing.
  City name is ${userInput}. 
  1. Average income of the district is ${parameter1Value}. 
  2. Average income of the state is ${parameter2Value}. 
  3. Literacy rate of the district is ${parameter3Value}. 
  4. Backwardness of the district is ${parameter5Value}. 
  5. Rural population of the district is ${parameter6Value}.`;


const params = {
  prompt: prompt,
  max_tokens: 150,  // Adjust as needed
  temperature: 0.7,  // Adjust as needed
  stop: null  // custom stop words
};

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', params, { headers: headers })
  .then(response => {
    const fullResponse = response.data.choices[0].text;
    console.log(fullResponse);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
