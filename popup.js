
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
  async function sendDescriptionToAI(description) {
    console.log("Running send to AI");
    chrome.runtime.sendMessage(
      { action: "sendToAI", prompt: description },
      function(response) {
        if (response && response.response) {
          // Parse the response and generate HTML sections
          const aiResponse = JSON.parse(response.response);
          document.getElementById("aiResponse").innerHTML = generateHtmlSections(aiResponse);
        } else {
          document.getElementById("aiResponse").textContent = "Error generating AI response.";
        }
      }
    );
  }
  
  // Function to generate HTML sections based on the AI response
  function generateHtmlSections(response) {
    let htmlOutput = "";
  
    const sections = [
      { code: "001", name: "Product Name", key: "name " },  // Ensure space in 'name ' matches the key exactly
      { code: "002", name: "Brand", key: "brand" },
      { code: "003", name: "Description", key: "description" },
      { code: "004", name: "Ingredients", key: "ingredients" },
      { code: "005", name: "Nutritional Information", key: "nutritional information" },
      { code: "006", name: "Vitamins and Minerals", key: "vitamins and minerals" },
      { code: "007", name: "Health Considerations", key: "health considerations" },
      { code: "008", name: "Tips for Healthier Consumption", key: "tips for healthier consumption" },
      { code: "009", name: "Calories", key: "calories" },
      { code: "010", name: "Veg or Non-Veg", key: "veg or non veg" },
      { code: "011", name: "Allergens", key: "allergens" },
      { code: "012", name: "Processed Levels", key: "processed levels" },
      { code: "013", name: "Brand Claims Validation", key: "brand claims validation" },
      { code: "014", name: "Dish or Not", key: "dish or no" }
    ];
  
    sections.forEach(section => {
      const value = response[section.key] || "No data available";
      htmlOutput += `
        <div class="section">
          <h2>${section.name}</h2>  
          <p>${value}</p>
          <hr>
        </div>
      `;
    });
  
    return htmlOutput;
  }