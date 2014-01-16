// Copyright (c) 2014 MarIO - http://www.mvcejas.com. All rights reserved.


document.addEventListener('DOMContentLoaded', function () {

	document.getElementById('xtrak').onclick = function(){
		chrome.tabs.executeScript(null,{ file: "scripts/jquery.js" },function(){
			chrome.tabs.executeScript(null,{ file: "scripts/script.js" });
		});
	};


});