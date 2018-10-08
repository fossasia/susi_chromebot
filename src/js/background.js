/* jshint ignore:start */
let windows = {};
let lastPosition = null;

chrome.browserAction.onClicked.addListener((tab) => {
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

var openWindow = chrome.contextMenus.create({
    id: 'susi-to-left',
    title: 'Open as window',
    contexts: ['all']
  });

// perform action on clicking a context menu
chrome.contextMenus.onClicked.addListener((info,tab) => {
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

	else if(menuId === "goToSkills"){
		var skillURL = "https://skills.susi.ai";
    	chrome.tabs.create({ url: skillURL });
	}
    else{
        openDevToolsWindow('susi-to-left')
    }
});

function openDevToolsWindow(position) {
    function popWindow(action, url, customOptions) {
      function focusIfExist(callback) {
          debugger;
          callback();
          lastPosition = position;
      }
  
      focusIfExist(() => {
        let options = {
          type: 'popup',
          ...customOptions
        };
        if (action === 'open') {
          options.url = chrome.extension.getURL(url + '#' + position.substr(position.indexOf('-') + 1));
          chrome.windows.create(options, (win) => {
            windows[position] = win.id;
            if (navigator.userAgent.indexOf('Firefox') !== -1) {
              chrome.windows.update(win.id, { focused: true, ...customOptions });
            }
          });
        }
      });
    }
  
    let params = { left: 0, top: 0, width: 350, height: 430 };
    let url = 'popup.html';
    popWindow('open', url, params);
  }

/* jshint ignore:end */
