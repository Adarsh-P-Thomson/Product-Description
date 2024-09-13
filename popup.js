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
  }
  