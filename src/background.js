/* jshint ignore:start */
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({
        file: 'script.js'
    });
});

// create a contextMenu
var askSusi = chrome.contextMenus.create({
	"title": "Ask SUSI - \"%s\"",
	"contexts":["selection"],
	id:"askSusi"
});

// perform action on clicking a context menu
chrome.contextMenus.onClicked.addListener(function(info,tab){
	var menuId = info.menuItemId;
	var query = info.selectionText;
	if(menuId==="askSusi"){
		chrome.storage.local.set({
			"askSusiQuery":query
		});
		chrome.browserAction.setBadgeText({text: "*"});
	}

});

/* jshint ignore:end */
