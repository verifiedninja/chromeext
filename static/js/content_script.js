var verbose = false;
var ninja_site = "https://verified.ninja/";
var api_verify = ninja_site+"api/v1/verify/";

// Source: http://stackoverflow.com/a/20097994
function getUrlVars(href) {
	var vars = {};
	var parts = href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
	function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function getUrlParts(href) {
	var vars = {};
	var url = href.split("?")[0];
	var parts = url.split("/");
	return arrayClean(parts);
}

function arrayClean(arr) {
	return arr.filter(function(e){return e}); 
}

var checkicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC42/Ixj3wAAAfpJREFUOE9tUk1LG1EUHbqr/QXGMVpxYv1qY0GKWKwuqgip/aCUEl3Y2tbMuBCpRDIRmkWhqy4qCKmlIkI22YQOTaC0zphZ9AdkV/9BCCS7LLrw9N6ZSTovmQsHZu4757z3zn1SZ+m/tm6nzrTPuqle6Kb2N03g731Lze6fJ6Y8Wne9M970pE31C5Ev05aGIPCafq4eMdeTueWKNTtIFAQyKn/8vXPVk0sS7xxEJFPoZ2p3n5AijSPmO3cee/f7a8yvzmBQGYAclnHz7jheHDwVDMj80smEA/MvpH4mMDk7hlAoJKBP7sP6J9GETpeVOGF/8/n7B4jFYjAMA8VisY1kMkknGRMNTO2CDGhUvubiqznkcjmUy2WUSiVUKhXk83lUq1X003X8mbCWAhQNHu8tIZPJoNFooF6vo9lsolarwbZtRG4Nt3kMx6B1he38OvZ+bOLttw0MjQxCURREIpE2ZFnGo+SiYJC21D+Sbm1l+Sf+4SGi9yawU3iJza9xjEQVIcBlbd4Zq9/ADdE3Rh7V+J0buE85hK/3C1OYmBlF4jj+34DGqFta1HkL/ChaC7NPpgWhHwNDYagnq+7upnrkiLn4KVMg9sbhs0ChH1MLk91PmYsb00tRI0jUAXvtdO2aJ+uqK0SIEQq9od56S+R9FwgrzHGpXJL0D/+X6KhM5fDLAAAAAElFTkSuQmCC';
var xicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC42/Ixj3wAAAe1JREFUOE9tUk1rGlEUHbJr8wvijJo2ziRNQhKT0A8iralRZ8aZcVdol6XLdhVwbf5BoRubQLsobmxBsOgmmziLbkqITqDQ/AMRdOcii5y8+xxlns6FA+/dd8557917pdm4LNi7V6b1tWvYNx3Dvu0YxVtad/NO5TpXTPq0+bjIvXvY0Z0zRr7zTAdh4Gf5wilxfdk4uNgoumGiMDCj9j/nwwNfLkl0cxiRmeJKn88TukbhjIvpz7PP/pM38X5jC6vxGGKKjENVxfdUWjBg5ne8JlSw4MGl4SCdSCASiQiIyjK+zZiw11UkqnAw+fn5ASzLQqPRQLPZnKJUKjFjVTBgXbqRqFXB5KedPVSrVbTbbbRaLXieh1qthl6vh7isCDUhLTMoCgYn+89QLpcxHA4xGAwwGo3Q7/fhui6S8eUpj8ANJl84P9LxV7fgZk08icWhssJpmjaFoigo7z0VDDzd+S95BbtCmy8vUsioGi6yOn6mM9hdfiQU8Jh9jdoaNOBFDLaRWnWwksDH7SQeK1GhCymW//XqaCqmNnqmtcNngYZicvB2Y1MQBrESjaF+mOU8dukpF1OMR9l2f7x8HSoMIqetzY8yBSXstfVGmGgG7u83mUVfNhcLjGAx1OWlpcFE5K/rDA5xxlQKSboHdrnJQPopy+EAAAAASUVORK5CYII=';

// Return the icon
function verifiedNinjaImg(user, site) {
	
	var icon = xicon;
	var text = "is NOT a Verified.ninja.";
	
	if (lsGet("users", user, false)) {
		icon = checkicon;
		text = "is a Verified.ninja!";
	}
	
	return '<a style="display: inline;" href="'+ninja_site+'public/'+site+'/'+user+'" target="_blank"><img width="16" height="16" style="height: 16px; width: 16px; float: none;" title="'+user+' '+text+'" src="'+icon+'"></a>';
}

function wrapSpan(s) {
	return '<span style="display: inline-block; margin-left: 5px; float: none;">'+s+'</span>';	
}

function cacheProfileInfo(user, site, userkey, token) {	
	if (lsExists("users", user)) {
		if (verbose) {
			console.log("User exist in cache: "+user);
		}
		return;
	} else {
		if (verbose) {
			console.log("User not exist in cache: "+user);	
		}
	}
	
	return $.getJSON(api_verify + site + "/" + user + "?userkey="+ userkey + "&token=" + token, function(data) {
		lsSet("users", user, data.VerifiedNinja);
		if (verbose) {
			console.log("GET request returned:" + data.VerifiedNinja)
		}
	}).error(function() { 
		console.log("ERROR!");
	})
	;
}

function lsSet(key, name, value) {
	if(typeof(Storage) !== "undefined") {
		if (!localStorage[key]) localStorage[key] = JSON.stringify({});
		var o = JSON.parse(localStorage[key]);

		// Set as an object literal		
		if (o.length == 0) {
			o = {}
		}
		
		// If the user photo count doesn't exist
		if (!o[name]) {
			o[name] = value;
			localStorage.setItem(key, JSON.stringify(o));	
		}
	}
}

function lsGet(key, name, def) {
	if(typeof(Storage) !== "undefined") {
		if (!localStorage[key]) localStorage[key] = JSON.stringify({});
		var o = JSON.parse(localStorage[key]);
		if (o[name] != undefined) {	
			if (verbose) {	
				console.log(key + " found for: " + name);
			}
			return o[name];
		}
	}
	
	return def;
}

function lsExists(key, name) {
	if(typeof(Storage) !== "undefined") {
		if (!localStorage[key]) localStorage[key] = JSON.stringify({});
		var o = JSON.parse(localStorage[key]);
		if (o[name] != undefined) {	
			return true;
		}
	}
	
	return false;
}

/* Start */

function startProcess() {
	chrome.runtime.sendMessage({storage: true}, function(response) {
		var userkey = response.userkey;
		var token = response.token;
		
		if (token == undefined || userkey == undefined) {
			console.log("Verified.ninja: chrome extension is not synced.");
			return;
		}
		
		if (window.location.href.indexOf("www.okcupid.com") != -1) {
			runOkCupid(userkey, token);
			return;
		}
		
		$(function() {
			if (window.location.href.indexOf("christianmingle.com") != -1) {		
				runChristianMingle(userkey, token);
			}
		});
	});
}

startProcess();