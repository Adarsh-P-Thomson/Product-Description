const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      "name ": {
        type: "string"
      },
      brand: {
        type: "string"
      },
      description: {
        type: "string"
      },
      ingredients: {
        type: "string"
      },
      "nutritional information": {
        type: "string"
      },
      "vitamins and minerals": {
        type: "string"
      },
      "health considerations": {
        type: "string"
      },
      "tips for healthier consumption": {
        type: "string"
      },
      calories: {
        type: "string"
      },
      "veg or non veg": {
        type: "string"
      },
      allergens: {
        type: "string"
      },
      "processed levels": {
        type: "string"
      },
      "brand claims validation": {
        type: "string"
      },
      "dish or no": {
        type: "string"
      }
    },
    required: [
      "name ",
      "brand",
      "description",
      "ingredients",
      "nutritional information",
      "vitamins and minerals",
      "health considerations",
      "tips for healthier consumption",
      "calories",
      "veg or non veg",
      "allergens",
      "processed levels",
      "brand claims validation",
      "dish or no"
    ]
  },
};
const systemInstruction = "You are an expert in food and on all things edible, about their health and what things they are made of in terms of how they affect a disease or what nutrients they have.\nIf link shared and details are food or edible only answer otherwise return all fields as null."; 
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
        systemInstruction: {
            role: "user",
            parts: [
            {
               text: "You are an expert in food and on all things edible , about their health and what things they are made of in terms of how they affect a disease or what nutrients they have.\nIf link shared and details are food or edible only answer otherwise return all fields as null."
            }
          ]
  },
        
        generationConfig: generationConfig
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const responseText = await response.json();
    console.log(responseText);

   
    const generatedText = responseText?.candidates?.[0]?.content || 'No content generated';
    console.log('Generated Response:', generatedText.parts[0].text);  // Log the generated text
    return generatedText.parts[0].text;

  } catch (error) {
    console.error('Error generating text:', error);
    return 'Error generating text.';
  }
}


