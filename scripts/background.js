chrome.runtime.onInstalled.addListener(function(){
	chrome.tabs.create({url:'http://www.mvcejas.com/facebook-user-scraper/?r=install'});
});