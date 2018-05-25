(function(){
	pw.loader.using( [ 'pokemon.js'], function(){
	var html = '';
	html += '<select>';
	for(var pi=1;pi<=pw.info.maxPokemonCount;pi++) {
		html+='<option value="'+pi+'">#'+String('00').concat(pi).slice(-3) + ' ' + pw.util.getPokemonName(pi)+'</option>';
	}
	html+='</select>';
	var $pdd = $(html);
	var $container = $('.pokemondropdown');
	$pdd.val(parseInt($container.data('index'),10));
	var format = $container.data('format');
	$pdd.change(function() {
		var title = format.replace('{number}',String('00').concat($(this).val()).slice(-3));
		location.href=mw.util.getUrl(title);
	});
	$container.append($pdd);
});
})();