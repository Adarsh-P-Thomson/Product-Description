const generationConfig = {
  temperature: 1,
  topK: 64,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain"
};

const API_KEY = 'AIzaSyCoMe4j5HOs0iL56VddaHfLzmsMvA6FCcY'; // Your API key
const aiurl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("In Listener")
  if (message.action === "sendToAI") {
    const prompt = message.prompt;

    // Send the extracted content to the AI
    generateText("Describe"+prompt)
      .then(responseText => {
        // Send the AI's response back to the content script
        sendResponse({ response: responseText });
      })
      .catch(error => {
        console.error("Error generating AI response:", error);
        sendResponse({ response: "Error generating AI response." });
      });

    return true;  // Keep the message channel open for async response
  }
});


// Function to generate text using fetch (since XMLHttpRequest is not supported in service workers)
async function generateText(prompt) {
  try {
    const response = await fetch(aiurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: generationConfig
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data?.candidates?.[0]?.content || 'No content generated';
    console.log('Generated Response:', generatedText.parts[0].text);  // Log the generated text
    return generatedText.parts[0].text;

  } catch (error) {
    console.error('Error generating text:', error);
    return 'Error generating text.';
  }
}

// Call the function to generate text
//generateText("tell me about blackholes");
