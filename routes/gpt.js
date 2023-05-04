const openai = require('openai');
console.log(input)
const generateShoeList = async (input) => {
    // Set up the OpenAI API client
    openai.apiKey = process.env.OPENAI_API_KEY;

    // Define the prompt for generating a list of shoes
    const prompt = `List the top 10 shoes similar to ${input}`;

    // Use the OpenAI API to generate a response
    const response = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 200,
        n: 1,
        stop: '\n',
        temperature: 0.5,
    });

    // Extract the list of shoes from the response
    const shoeList = response.choices[0].text.trim();

    // Return the generated shoe list
    return shoeList;
};

module.exports = { generateShoeList };
