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

var goToChat = chrome.contextMenus.create({
	"title": "Chat SUSI",
	"contexts":["browser_action"],
	id:"goToChatSusi"
});

var goToSkills = chrome.contextMenus.create({
	"title": "Skills SUSI",
	"contexts":["browser_action"],
	id:"goToSkillsSusi"
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
	else if(menuId==="goToChatSusi"){
		var chatURL = "https://chat.susi.ai";
    	chrome.tabs.create({ url: chatURL });
	}

	else{
		var skillURL = "https://skills.susi.ai";
    	chrome.tabs.create({ url: skillURL });
	}

});

/* jshint ignore:end */
