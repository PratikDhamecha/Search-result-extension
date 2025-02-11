// 1. Extract the search query from the URL
(function() {
    // Check if we're on Google or Bing
    if (window.location.hostname.includes("google.com") || window.location.hostname.includes("bing.com")) {
        // Get the 'q' parameter from the URL
        let urlParams = new URLSearchParams(window.location.search);
        let query = urlParams.get('q');
        if (query) {
            // Send the query to the background script
            chrome.runtime.sendMessage({ query: query }, (response) => {
                console.log("Message sent to background, response:", response);
            });
        }
    }
})();

// 2. Listen for a message from background and inject the suggestion box
chrome.runtime.onMessage.addListener((message) => {
    if (message.query && message.suggestions) {
        // Remove any existing suggestion box to avoid duplicates
        let existingBox = document.getElementById("suggestionBox");
        if (existingBox) existingBox.remove();

        // Create the suggestion box
        let suggestionBox = document.createElement("div");
        suggestionBox.id = "suggestionBox";
        suggestionBox.style.position = "fixed";
        suggestionBox.style.bottom = "20px";
        suggestionBox.style.right = "20px";
        suggestionBox.style.backgroundColor = "#fff";
        suggestionBox.style.border = "1px solid #ccc";
        suggestionBox.style.padding = "10px";
        suggestionBox.style.borderRadius = "5px";
        suggestionBox.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
        suggestionBox.style.zIndex = "9999";

        let title = document.createElement("h4");
        title.textContent = "Recommended Tools:";
        title.style.margin = "0 0 10px 0";
        suggestionBox.appendChild(title);

        // Create a list of suggestions
        let list = document.createElement("ul");
        list.style.listStyleType = "none";
        list.style.padding = "0";
        list.style.margin = "0";
        message.suggestions.forEach(tool => {
            let item = document.createElement("li");
            item.textContent = tool;
            list.appendChild(item);
        });
        suggestionBox.appendChild(list);

        // Append the suggestion box to the body
        document.body.appendChild(suggestionBox);

        // Optionally, remove the suggestion box after a set time (e.g., 10 seconds)
        setTimeout(() => {
            suggestionBox.remove();
        }, 10000);
    }
});
