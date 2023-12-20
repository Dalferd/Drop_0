import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AIModule = ({userInput}) => {
  const [fullResponse, setFullResponse] = useState(null);
//   const userInput = 'Surat';
  const apiKey = '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';

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the function to get city parameters
        const cityParameters = getCityParameters(userInput);

        // Accessing parameter values
        const parameter1Value = cityParameters.dist_avg_income;
        const parameter2Value = cityParameters.state_avgi;
        const parameter3Value = cityParameters.dist_literacy;
        const parameter5Value = cityParameters.dist_back;
        const parameter6Value = cityParameters.dist_rural;

        // Build the prompt string
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

        // Call OpenAI API
        const response = await callOpenAPI(prompt, apiKey);

        // Set the fullResponse in the state
        setFullResponse(response);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [userInput]);

  // Function to get parameters for a given city
  const getCityParameters = (userInput) => {
    // Replace this with your logic to read and parse the JSON file
    // For simplicity, I'll just return a sample object
    return {
      dist_avg_income: 50000,
      state_avgi: 60000,
      dist_literacy: 85,
      dist_back: 20,
      dist_rural: 30,
    };
  };

  // Function to call OpenAI API
  const callOpenAPI = async (prompt, apiKey) => {
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

    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', params, { headers: headers });
    return response.data.choices[0].text;
  };

  return (
    <div>
        {/* <h2>{userInput}</h2> */}
      {/* Render your React component using the fullResponse */}
      <pre className='Response'>{fullResponse}</pre>
    </div>
  );
};

export default AIModule;
