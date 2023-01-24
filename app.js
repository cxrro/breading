async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

let tab = null
getCurrentTab();
let id = tab.id
let info = tab.info

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
    console.log(info);
    if (info && info.url) {
      if (info.url.includes("taguette")) {
		chrome.scripting.executeScript({
		target: {tabId: tab.id},
		files: ['main.js']
		})
		chrome.action.setBadgeBackgroundColor(
			{color: "#8CD7A0"}
		)
		console.log("injected breading script")
		}
	}
});

