/* jshint ignore:start */
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({
        file: 'script.js'
    });
});
/* jshint ignore:end */
