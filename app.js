async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

let tab = null
getCurrentTab();

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
	  target: {tabId: tab.id},
	  files: ['main.js']
	})
	chrome.browserAction.setBadgeBackgroundColor(
		{color: "#8CD7A0"}
	)
	console.log("injected breading script")
});

