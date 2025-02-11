chrome.storage.local.get("recommendations", (data) => {
    const toolList = document.getElementById("toolList");
    if (data.recommendations && data.recommendations.length > 0) {
        data.recommendations.forEach((tool) => {
            let listItem = document.createElement("li");
            listItem.textContent = tool;
            toolList.appendChild(listItem);
        });
    } else {
        toolList.innerHTML = "<li>No suggestions available.</li>";
    }
});
