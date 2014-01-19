var pagecheck, clearing, interval = 2000;

Go();

function Go(){
	if( (/facebook\.com\/search/i).test(window.location) ){
		Log('Started analyzing page...');
		CheckResults();
	}
	else
		alert('This extension works on FB search.');
};

function Extract(){
	var user = $('[data-bt*=id][data-bt*=rank]')
		, name = $('[data-bt="{"ct":"title"}"]')
		, head = $('[data-bt="{"ct":"sub_headers"}"]')
		, snip = $('[data-bt="{"ct":"snippets"}"]')
		, data = new Array();

	name.each(function(a,b){
		var uid = $.trim(user.eq(a).data().bt.id)
			,	usr = $.trim($('a',b).text())
			,	hdt = $.trim(head.eq(a).text())
			, opt = new Array();

		snip.eq(a).find('._ajw').each(function(a,b){
			opt.push($.trim(b.innerText));
		});

		data.push("\n"+uid,usr,hdt,opt.join(','));
	});

	$('body').find('[download]').remove();
	
	const MIME_TYPE = 'text/plain';

  var bb = new Blob([data], {type: MIME_TYPE});

	var link = document.createElement("a");
	link.textContent = "Save as CSV";
	link.download = "FB"+new Date().getTime()+".csv";
  link.href = window.URL.createObjectURL(bb);

	//window.open(link); //debug only

	document.body.appendChild(link);
	
	if($('body').find('[download]').length != 0){
		link.click();
	}
}

function CheckResults(){
	var count = 1;
	pagecheck = setInterval(function(){
		var eop = $("div:contains('End of results')").length;
		if(eop==0){
			Log('Scanning elements...('+(count++)+')');
			$('html,body').animate({
				scrollTop: $('#pageFooter').offset().top
			},2000)
		}
		else{
			Log('Scanning completed...');
			// clear page check
			clearInterval(pagecheck);
			// wait 10s to completely load page
			// before saving all data
			Log('Exporting data in 10 seconds...');
			setTimeout(function(){
				$('html,body').animate({
					scrollTop: $('#pageFooter').offset().top
				});
				setTimeout(Extract,300);
				setTimeout(Log('Data exported!'),1000);
				setTimeout(function(){
					$('#chrome-ext-alert').fadeOut();
				},10000)
			},10000);
			//Clearing(); useless!
		}
	},interval);
}

function Clearing(){
	clearing = setInterval(function(){
		var a = $("div:contains('Loading more results')").length;
		console.log('Clearing...',a);
		if(a==0){
			clearInterval(clearing)
			$('html,body').animate({
				scrollTop: $('#pageFooter').offset().top,
				complete: function(){
				console.log('Saving...');
				Extract();
				}
			},300);
		}
	},interval);
}

function Log(txt){
	$('#chrome-ext-alert').remove();
	$('body').append('<div style="position:fixed;z-index:1024;top:0;right:0;background:white;color:black;font-size:20px;padding:2px 10px;" id="chrome-ext-alert">'+txt+'</div>');
}