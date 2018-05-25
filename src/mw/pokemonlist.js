pw.loader.using( [ 'pokemon.js', 'pokemon.7.js', 'pokemonsprite.js' ], function(){
	
	function createPokemonTR(pid) {
		var tr = '';
		var num = pid.split('.');
		var name = pw.util.getPokemonName( pid );
		var data = pw.database.pokemon.data[7][pid];

		tr += '<tr>';
		tr += '<td>' + pw.sprite.create( 'pi', pid ) + '</td>';
		tr += '<td>#'+num[0]+'</td>';
		tr += '<td><a href="'+mw.util.getUrl(name.name)+'">'+name.fullname+'</a></td>';
 
		var type = pw.util.createColorlabel( 'span', 'type', pw.database.types.names['zh-cn'][data.types[0]] );
		if ( data.types[0] != data.types[1] ) type += pw.util.createColorlabel( 'span', 'type', pw.database.types.names['zh-cn'][data.types[1]] );
		tr += '<td>'+type+'</td>';
		
		var a1 = pw.database.abilities.names["zh-cn"][data.abilities[0]];
		var a2 = pw.database.abilities.names["zh-cn"][data.abilities[1]];
		var a3 = pw.database.abilities.names["zh-cn"][data.abilities[2]];
		tr += '<td><a href="'+a1+'">'+a1+'</a></td>';
		if ( a1 != a2 && a2 != 0 ) {
			tr += '<td><a href="'+a2+'">'+a2+'</a></td>';
		} else {
			tr += '<td></td>';
		}
		if ( a3 != 0 ) {
			tr += '<td><a href="'+a3+'">'+a3+'</a></td>';
		} else {
			tr += '<td></td>';
		}
 
		tr += '<td><span class="ct c-stat-hp">'+data.basestats[0]+'</span></td>';
		tr += '<td><span class="ct c-stat-at">'+data.basestats[1]+'</span></td>';
		tr += '<td><span class="ct c-stat-df">'+data.basestats[2]+'</span></td>';
		tr += '<td><span class="ct c-stat-sa">'+data.basestats[4]+'</span></td>';
		tr += '<td><span class="ct c-stat-sd">'+data.basestats[5]+'</span></td>';
		tr += '<td><span class="ct c-stat-sp">'+data.basestats[3]+'</span></td>';
		tr += '<td><span class="ct c-stat-sum">'+eval(data.basestats.join("+"))+'</span></td>';
		tr += '</tr>';
		return tr;
	};

	$('.pokemonlist').each(function(){
		var $this = $(this);
		var html = ''
			+ '<tbody>'
			+ '<tr>'
			+ 	'<th style="width:5%">图标</th>'
			+ 	'<th style="width:5%">编号</th>'
			+ 	'<th style="width:15%">宝可梦</th>'
			+ 	'<th style="width:12%">属性</th>'
			+ 	'<th style="width:16%" colspan="2">特性</th>'
			+ 	'<th style="width:8%">隐藏特性</th>'
			+ 	'<th>&nbsp;HP&nbsp;</th>'
			+ 	'<th>攻击</th>'
			+ 	'<th>防御</th>'
			+ 	'<th>特攻</th>'
			+ 	'<th>特防</th>'
			+ 	'<th>速度</th>'
			+ 	'<th>总和</th>'
			+ '</tr>';

		if ( $this.data('list') ) {
			var pokemonlist = $this.data('list').toString().split(',');
			$.each( pokemonlist, function( i, pid ){
				if ( pid in pw.database.pokemon.data[7] ) html += createPokemonTR(pid);
			});
		} else if ( $this.data('type') ) {
			var type = parseInt($this.data('type'));
			$.each( pw.database.pokemon.data[7], function( pid, data ){
				if ( $.inArray( type, data.types ) > -1 ) html += createPokemonTR(pid);
			});
		} else if ( $this.data('ability') ) {
			var ability = parseInt($this.data('ability'));
			$.each( pw.database.pokemon.data[7], function( pid, data ){
				if ( $.inArray( ability, data.abilities ) > -1 ) html += createPokemonTR(pid);
			});
		}

		html += '</tbody>';
		$this.html( pw.util.createArticleTable(html) );
		
	});

	mw.loader.using( 'jquery.tablesorter', function() {
		$('.pokemonlist table').tablesorter( {sortList: [ { 1: 'asc'} ]} );
	} );
});