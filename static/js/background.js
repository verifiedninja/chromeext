// Send tokens to content_script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.storage) {
    if (typeof request.value != 'undefined') {
      localStorage[request.storage] = request.value;
    }
    sendResponse({token: localStorage.token, userkey: localStorage.userkey});
  } else {
    sendResponse({});
  }
});

// When extension button is clicked, open a window
chrome.browserAction.onClicked.addListener(function (tab) {
	// If either the token or user key don"t exist, show the settings page
	if (localStorage.token == undefined || localStorage.userkey == undefined) {
	    chrome.tabs.create({
	        url: "initial.html"
	    });
	} else {
		chrome.tabs.create({
		    url: "options.html"
		});
	}
});


var setupContextMenus = function () {	
	var contextClickHandler = function (info, tab) {
		if (info.menuItemId === "context-selection") {			
			window.open("https://instagram.com/"+info.selectionText);
			window.open("https://twitter.com/"+info.selectionText);
			window.open("https://www.facebook.com/"+info.selectionText);
			window.open("https://www.pinterest.com/"+info.selectionText);
        } 
	};
	
	chrome.contextMenus.create({
	   "title": "Search social media for '%s'",
	       "contexts": ["selection"],
	       "id": "context-selection"
	});
	
	chrome.contextMenus.onClicked.addListener(contextClickHandler);
};
	
// If either the token or user key don"t exist, show the settings page
if (localStorage.token == undefined || localStorage.userkey == undefined) {
    chrome.tabs.create({
        url: "initial.html"
    });
} else { // Else setup the context menus
    setupContextMenus();
}