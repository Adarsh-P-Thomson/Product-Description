
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
      {  name: "Product Name", key: "name " },  // Ensure space in 'name ' matches the key exactly
      { name: "Brand", key: "brand" },
      {  name: "Description", key: "description" },
      {  name: "Ingredients", key: "ingredients" },
      {  name: "Nutritional Information", key: "nutritional information" },
      {  name: "Vitamins and Minerals", key: "vitamins and minerals" },
      {  name: "Health Considerations", key: "health considerations" },
      {  name: "Tips for Healthier Consumption", key: "tips for healthier consumption" },
      {  name: "Calories", key: "calories" },
      {  name: "Veg or Non-Veg", key: "veg or non veg" },
      {  name: "Allergens", key: "allergens" },
      {  name: "Processed Levels", key: "processed levels" },
      {  name: "Brand Claims Validation", key: "brand claims validation" },
      {  name: "Dish or Not", key: "dish or no" }
    ];
  
    sections.forEach(section => {
      const value = response[section.key] || "No data available";
      if(value!=="null")
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