pokeWiki.loader.using( [ 'pokemon.js', 'poketoru.js','poketoru.pokemon.js' ], function() {

$.extend( true, pw.poketoru, {
	superEffects : [],
	skillPokemonCount : []
});

(function() {

	pw.poketoru.displayPokemon = function (div) {
		var list = $(div).data('pokemonList');
		var html='';
		$.each( list, function( i, pkmnId ) {
			html += '<img class="shufflepokemon" src="' + pw.poketoru.getPoketoruIconSrc(pkmnId) + '" data-pid="'+pkmnId+'" style="width:32px;"/>';
		});
		$(div).html(html);
		pw.poketoru.createPoketoruTooltips();
	}

	if ( $('.shuffle-skill, .shuffle-filter').length > 0 ) {
		for(var i=0;i<18;i++ ){
			pw.poketoru.superEffects[i]=[];
			for(var j=0;j<18;j++ ){
				if( pw.poketoru.typeEffects[j][i]==2 ) pw.poketoru.superEffects[i].push(j);
			}
		}
	
		pw.poketoru.loadAllPokemon();
		
		$('.shuffle-skill, .shuffle-filter').each( function() {
			var skillID = $(this).data('sid');
			if ( skillID.length == 0 ) return;
	
			var skillType = $(this).data('type');
			var skillSE = $(this).data('se');
			var checkType = (skillType !== undefined  && skillType !== '');
			var checkSE = (skillSE !== undefined  && skillSE !== '');
	
			skillID = $.isArray(skillID) ? skillID : [parseInt(skillID)];
			if ( checkType ) { skillType = $.isArray(skillType) ? skillType : [parseInt(skillType)]; }
			if ( checkSE ) { skillSE = parseInt(skillSE); }
	
			var pokemonList = [];
			$.each( pw.poketoru.sortedPokemonList, function( i, pkmn ) {
				if ( $(skillID).filter(pkmn.skills).length == 0 ) return;
				if ( checkType && $.inArray( pkmn.type, skillType ) == -1 ) return;
				if ( checkSE && $.inArray( pkmn.type, pw.poketoru.superEffects[skillSE] ) == -1 ) return;
				pokemonList.push(pkmn.id);
			});
			if ( pokemonList.length == 0 ) return;

			$(this).data('pokemonList', pokemonList);

			if ( $(this).data('autohide') ) {
				var $a = $('<a href="#">[显示' + pokemonList.length + '只宝可梦]</a>');
				$a.click(function(){
					pw.poketoru.displayPokemon($(this).parent());
					return false;
				});
				$(this).html($a);
			} else {
				pw.poketoru.displayPokemon(this);
			}

		});
	
	}

	if ( $('.shuffle-unreleased').length > 0 ) {
		pokeWiki.loader.using( ['MediaWiki:Pokemon.7.js'], function() {
			var unreleasedList = [];
			for (var typeId=0;typeId<pw.database.types.names['zh-cn'].length;typeId++) {
				unreleasedList.push([]);
			}

			$.each(pw.database.pokemon.data[7], function(pkmnID,pkmn){
				if ( !(pkmnID in pw.poketoru.pokemonData ) ) {
					unreleasedList[pkmn.t[0]].push(pkmnID);
					if ( pkmn.t[0] != pkmn.t[1] ) unreleasedList[pkmn.t[1]].push(pkmnID);
				}
			});
		
			$('.shuffle-unreleased').each(function(){
				var $this = $(this);
				var typeId = parseInt($this.data('type'),10);
		
				var list = $this.data("list");
				$.each(list, function(i,pkmnID){
					if ( $.inArray( pkmnID,unreleasedList[typeId] ) == -1 && !(pkmnID in pw.poketoru.pokemonData ) ) unreleasedList[typeId].push(pkmnID);
				});
				unreleasedList[typeId].sort();
				var html = '';
				$.each(unreleasedList[typeId], function(i,pkmnID){
					html += '<img src="' + pw.poketoru.getPoketoruIconSrc(pkmnID) + '" style="width:50px;" onerror="this.style.display=\'none\'"/>'
				});
				$this.html(html);
			});
		});
	}

})();

});
