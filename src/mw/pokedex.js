pokedex = {
	
	createPokemonRow : function(pid, data) {
		var tr = '';
		var num = pid.split('.');
		var name = pw.util.getPokemonName( pid );

		tr += '<tr style="line-height:30px;">';
		tr += '<td>' + pw.sprite.create('pi',pid) + '</td>';
		tr += '<td>#'+num[0]+'</td>';
		tr += '<td><a href="'+mw.util.getUrl(name.name)+'">'+name.fullname+'</a></td>';
 
		var type = pw.util.createColorlabel( 'span', 'type', pw.database.types.names["zh-cn"][data.types[0]] );
		if ( data.types[0] != data.types[1] ) type += pw.util.createColorlabel( 'span', 'type', pw.database.types.names["zh-cn"][data.types[1]] );
		tr += '<td>'+type+'</td>';
 
		var a1 = pw.database.abilities.names["zh-cn"][data.abilities[0]];
		var a2 = pw.database.abilities.names["zh-cn"][data.abilities[1]];
		var a3 = pw.database.abilities.names["zh-cn"][data.abilities[2]];
		tr += '<td><a href="'+a1+'" title="'+a1+'">'+a1+'</a></td>';
		if ( a1 != a2 && a2 != 0 ) {
			tr += '<td><a href="'+a2+'" title="'+a2+'">'+a2+'</a></td>';
		} else {
			tr += '<td></td>';
		}
		if ( a3 != 0 ) {
			tr += '<td><a href="'+a3+'" title="'+a3+'">'+a3+'</a></td>';
		} else {
			tr += '<td></td>';
		}
 
		tr += '<td class="ct c-stat-hp">'+data.basestats[0]+'</td>';
		tr += '<td class="ct c-stat-at">'+data.basestats[1]+'</td>';
		tr += '<td class="ct c-stat-df">'+data.basestats[2]+'</td>';
		tr += '<td class="ct c-stat-sa">'+data.basestats[4]+'</td>';
		tr += '<td class="ct c-stat-sd">'+data.basestats[5]+'</td>';
		tr += '<td class="ct c-stat-sp">'+data.basestats[3]+'</td>';
		tr += '<td class="ct c-stat-sum">'+eval(data.basestats.join("+"))+'</td>';
		tr += '</tr>';
		return tr;
	},
	
	createPokemonBlock : function(pid, data) {
		var tr = '';
		var num = pid.split('.');
		var name = pw.util.getPokemonName( pid );
		var data = pw.database.pokemon.data[7][pid];
		var type = pw.util.createColorlabel( 'span', 'type', pw.database.types.names["zh-cn"][data.types[0]] );
		if ( data.types[0] != data.types[1] ) type += pw.util.createColorlabel( 'span', 'type', pw.database.types.names["zh-cn"][data.types[1]] );

		tr += '<div style="width:130px;padding:20px 10px;float:left;">';
		tr += '<div>' + pw.util.createPokemonImage('pgl',pid,'width:100px;') + '</div>';
		tr += '<div><a href="'+mw.util.getUrl(name.name)+'">'+name.name+'</a></div>';
		tr += '<div>' + type + '</div>';
		tr += '</div>';
		return tr;
	},
	
	createPanel : function(){
		
		var htmlDex = ''
			+'<div class="card pokedex">'
			+'<div class="card-header">宝可梦图鉴</div>'
			+'<div class="card-body border-bottom">'
			+'<div class="container-fluid">'
			+'	<form class="form-horizontal" role="form">'
			+'		<div class="row">'
			+'				<div class="col-3"><select class="form-control" name="pokedex-type">'
			+'				<option value="-1">（属性）</option>'
			+ function(){
					var html = '';
					$.each( pw.database.types.names['zh-cn'], function(i,v){
						html += '<option value="'+i+'">'+v+'</option>';
					});
					return html;
				}()
			+'				</select></div>'
			+'				<div class="col-3"><select class="form-control" name="pokedex-ability">'
			+'				<option value="-1">（特性）</option>'
			+ function(){
					var html = '';
					$.each( pw.database.abilities.names['zh-cn'], function(i,v){
						if ( i == 0 ) return;
						html += '<option value="'+i+'">'+v+'</option>';
					});
					return html;
				}()
			+'				</select></div>'
			+'				<div class="col-3"><select class="form-control" name="pokedex-generation">'
			+'				<option value="-1">（世代）</option>'
			+ function(){
					var html = '';
					for ( var g=1; g<pw.info.maxPokemonCounts.length;g++) {
						html +=  '<option value="'+g+'">'+pokedex.genNames[g]+'</option>';
					}
					return html;
				}()
			+'				</select></div>'
			+'			<div class="col-2 btn-group" data-toggle="buttons">'
			+'				<label class="btn btn-default"><input type="radio" name="pokedex-display" value="0" checked>列表</label>'
			+'				<label class="btn btn-default"><input type="radio" name="pokedex-display" value="1" >图标</label>'
			+'			</div>'
			+'				<div class="col-1">'
			+'					<button type="button" class="btn btn-primary" id="pokedex-show">显示</button>'
			+'				</div>'
			+'		</div>'
			+'	</form>'
			+'</div>'
			+'</div>'
			+'<table class="table table-sm table-hover text-center pokedex-results">'
			+'<thead>'
			+'<tr>'
			+'<th>图标</th><th>编号</th><th>宝可梦</th><th>属性</th><th colspan="2">特性</th><th>隐藏特性</th>'
			+'<th>&nbsp;HP&nbsp;</th><th>攻击</th><th>防御</th><th>特攻</th><th>特防</th><th>速度</th><th>总和</th>'
			+'</tr>'
			+'</thead>'
			+'<tbody class="">'
			+'</tbody>'
			+'</table>'
			+'</div>'
			+'';
		$(".pw-jscontent").html(htmlDex);
		
		$('#pokedex-show').click(function(){
			var selectedType = parseInt($('select[name=pokedex-type]').val());
			var selectedAbility = parseInt($('select[name=pokedex-ability]').val());
			var selectedGeneration = parseInt($('select[name=pokedex-generation]').val());
			var display =  parseInt($('input[name=pokedex-display]:checked').val());
			if (selectedType == -1 && selectedAbility == -1 && selectedGeneration== -1 && display==1) {
				alert('数据太长，请添加筛选条件后重试。');
				return;
			}
			
			var html='';
	
			if ( display == 1 ) html += '<tr><td colspan="14">';
			$.each( pw.database.pokemon.data[7], function( pkmnID, pkmnData ) {
				if ( selectedType > -1 && $.inArray( selectedType, pkmnData.types )==-1  ) return;
				if ( selectedAbility > 0 && $.inArray( selectedAbility, pkmnData.abilities )==-1  ) return;
				if ( selectedGeneration > -1 ) {
					var num  = parseInt(pkmnID.split('.')[0]);
					if ( num <= pw.info.maxPokemonCounts[selectedGeneration-1] || num > pw.info.maxPokemonCounts[selectedGeneration] ) return;
				}
				if ( display == 0 ) {
					html += pokedex.createPokemonRow(pkmnID, pkmnData);
				} else {
					html += pokedex.createPokemonBlock(pkmnID, pkmnData);
				}
			});
			if ( display == 1 ) html += '</td></tr>';
			
			$('.pokedex-results thead').toggle( display == 0 );
			$('.pokedex-results').toggleClass('table-hover', display == 0 );
			$('.pokedex-results tbody').html(html);
		});

	},
	
	checkHash: function(){
		if ( window.location.hash ) {
			var hash = decodeURI(window.location.hash.slice(1).replace(/\./g,'%'));
			var t = $.inArray( hash, pw.database.types.names['zh-cn'] );
	
			if ( t > -1 ) {
				$('select[name=pokedex-type]').val(t);
				$('#pokedex-show').click();
			} else {
				var a = $.inArray( hash, pw.database.abilities.names['zh-cn'] );
				if ( a > 0 ) {
					$('select[name=pokedex-ability]').val(a);
					$('#pokedex-show').click();
				} else {
					var g = $.inArray( hash, pokedex.genNames );
					if ( g > 0 ) {
						$('select[name=pokedex-generation]').val(g);
						$('#pokedex-show').click();
					}
				}
			}
		}
	},
	
	init : function(){
		pw.loader.using( [ 'pokemon.js', 'pokemon.7.js', 'pokemonsprite.js', 'bootstrap'], function(){
			pokedex.genNames = [''];
			for(var g=1;g<pw.info.maxPokemonCounts.length;g++){
				pokedex.genNames[g] = '第' + '零一二三四五六七八九十'[g] + '世代';
			}
			
			pokedex.createPanel();
			pokedex.checkHash();
		});
	}(),
	
}