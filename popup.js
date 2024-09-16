/*document.addEventListener("DOMContentLoaded", function() {
    // Fetch the meta description when the popup is opened
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: scrapeMetaDescription
        },
        (results) => {
          const description = results[0].result || "No description found.";
          document.getElementById("description").textContent = description;
        }
      );
    });
  });
  
  // Function to scrape meta description using regex
  function scrapeMetaDescription() {
    const regex = /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i;
    const html = document.documentElement.innerHTML;
    const match = html.match(regex);
    return match ? match[1] : null;
  }*/
  
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch the meta description when the popup is opened
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: scrapeMetaDescription
        },
        (results) => {
          const description = results[0].result || "No description found.";
          document.getElementById("description").textContent = description;
  
          // After fetching the description, send it to the AI
          if (description !== "No description found.") {
            sendDescriptionToAI(description);
          }
        }
      );
    });
  });
  
  // Function to scrape meta description using regex
  function scrapeMetaDescription() {
    const regex = /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i;
    const html = document.documentElement.innerHTML;
    const match = html.match(regex);
    console.log(match);
    return match ? match[1] : null;
  }
  
  // Function to send the description to background.js and get AI response
  async function sendDescriptionToAI(description) {
    console.log("running send to ai");
    chrome.runtime.sendMessage(
      { action: "sendToAI", prompt: description },
      function(response) {
        if (response && response.response) {
          // Display AI's response in the popup
          document.getElementById("aiResponse").textContent = response.response;
        } else {
          document.getElementById("aiResponse").textContent = "Error generating AI response.";
        }
      }
    );
  }
  