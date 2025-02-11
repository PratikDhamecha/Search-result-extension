chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.query) {
        let query = message.query.toLowerCase();
        const tools = {
            "design": ["Canva", "Figma", "Adobe XD"],
            "seo": ["Ahrefs", "Semrush", "Moz"],
            "ai": ["ChatGPT", "Google Bard", "Claude AI"],
            "project management": ["Trello", "Asana", "Jira"]
        };

        let suggestions = [];
        for (let key in tools) {
            if (query.includes(key)) {
                suggestions = tools[key];
                break;
            }
        }

        // Store suggestions (if needed for the popup)
        chrome.storage.local.set({ recommendations: suggestions }, () => {
            console.log("Suggestions stored:", suggestions);
        });

        // Send suggestions back to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    query: message.query,
                    suggestions: suggestions
                });
            }
        });

        sendResponse({ status: "Suggestions processed" });
    }
});
