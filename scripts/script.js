test();

function test(){
	if( (/facebook\.com/i).test(window.location) ){
		xtrak();
	}
	else
		alert('This extension only works on FB.');
}

function xtrak(){

	var name = $('[data-bt="{"ct":"title"}"]')
		, head = $('[data-bt="{"ct":"sub_headers"}"]')
		, snip = $('[data-bt="{"ct":"snippets"}"]');

	name.each(function(a,b){
		//console.log($('a',b).text(),head.eq(a).text());
		snip.eq(a).find('div:eq(0)').each(function(a,b){
			console.log(b.innerText);
		});
	});

}