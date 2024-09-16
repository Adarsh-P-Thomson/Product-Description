// contentScript.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.response) {
      // Example: Displaying the AI response in an alert or injecting into the page
      alert("AI Response: " + message.response);
  
      // Or insert it into the page DOM
      const aiResponseElement = document.createElement('div');
      aiResponseElement.innerText = "AI Response: " + message.response;
      document.body.appendChild(aiResponseElement);
    }
  });
  