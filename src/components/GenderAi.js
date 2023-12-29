const axios = require('axios');
const apiKey = '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';

  const prompt = `We are analysing the impact 
  of government policies on drop out rates of Girl students in state of Gujrat. 
  List three policies of gujrat govenrnment that have helped in reducing the drop out rates of girls,
   and their impact with statistics. Give answer in past tense.`;
  
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
