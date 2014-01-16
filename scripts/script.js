test();

function test(){
	if( (/facebook\.com\/search/i).test(window.location) ){
		xtrak();
	}
	else
		alert('This extension works on FB search.');
};

function xtrak(){
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
};