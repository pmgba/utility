calc = {
	
	createPokemonRow : function(pid, data) {
		var tr = '';
		var num = pid.split('.');
		var name = pw.util.getPokemonName( pid );

		tr += '<tr style="line-height:30px;">';
		tr += '<td>' + pw.util.createPokemonIconS(pid).prop("outerHTML") + '</td>';
		tr += '<td>#'+num[0]+'</td>';
		tr += '<td><a href="'+mw.util.getUrl(name[0])+'">'+name[2]+'</a></td>';
 
		var type = pokeWiki.util.createColorlabel( 'span', 'type', data['t'][0], null, 'colorlabel-fixed' );
		if ( data['t'][0] != data['t'][1] ) type += pokeWiki.util.createColorlabel( 'span', 'type', data['t'][1], null, 'colorlabel-fixed' );
		tr += '<td>'+type+'</td>';
 
		var a1 = pokeWiki.database.abilities.names["zh-cn"][data['a'][0]];
		var a2 = pokeWiki.database.abilities.names["zh-cn"][data['a'][1]];
		var a3 = pokeWiki.database.abilities.names["zh-cn"][data['a'][2]];
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
 
		tr += '<td class="stat">'+data['b'][0]+'</td>';
		tr += '<td class="stat">'+data['b'][1]+'</td>';
		tr += '<td class="stat">'+data['b'][2]+'</td>';
		tr += '<td class="stat">'+data['b'][4]+'</td>';
		tr += '<td class="stat">'+data['b'][5]+'</td>';
		tr += '<td class="stat">'+data['b'][3]+'</td>';
		tr += '<td class="stat">'+eval(data['b'].join("+"))+'</td>';
		tr += '</tr>';
		return tr;
	},
	
	createPokemonBlock : function(pid, data) {
		var tr = '';
		var num = pid.split('.');
		var name = pokeWiki.util.getPokemonName( pid );
		var data = pokeWiki.database.pokemon.data[7][pid];
		var type = pokeWiki.util.createColorlabel( 'span', 'type', data['t'][0], null, 'colorlabel-fixed' );
		if ( data['t'][0] != data['t'][1] ) type += pokeWiki.util.createColorlabel( 'span', 'type', data['t'][1], null, 'colorlabel-fixed' );

		tr += '<div style="width:130px;padding:20px 10px;float:left;">';
		tr += '<div>' + pokeWiki.util.createPokemonImage('pgl',pid,'width:100px;') + '</div>';
		tr += '<div><a href="'+mw.util.getUrl(name[0])+'">'+name[0]+'</a></div>';
		tr += '<div>' + type + '</div>';
		tr += '</div>';
		return tr;
	},
	
	createPanel : function(){
		var html = ''
			+'<div class="card pokedex">'
			+'<div class="card-header">打击面查询器</div>'
			+'<div class="card-body border-bottom">'
			+'<div class="container-fluid">'
			+'	<form class="form-horizontal" role="form">'
			+'		<div class="row">'
			+'				<div class="col-1">招式属性：</div>'
			+'				<div class="col-1"><select class="form-control calc-move1"></div>'
			
			
			
			+'<div class="container"><div class="row">'
			+'	<div class="col-lg-6">'
			+'		<form class="form-horizontal" role="form">'
			+'			<div class="form-group">'
			+'				<label class="col-xs-2 control-label">世代</label>'
			+'				<div class="col-xs-10 btn-group" data-toggle="buttons">'
			//+'					<label class="btn btn-default"><input type="radio" name="calc_gen" value="5"  disabled="disabled">第五世代</label>'
			+'					<label class="btn btn-default active"><input type="radio" name="calc_gen" value="6" checked>第六世代</label>'
			+'				</div>'
			+'			</div>'
			+'			<div class="form-group">'
			+'				<label class="col-xs-2 control-label">技能属性</label>'
			+'				<div class="col-xs-10 form-control-static" id="calc_attacktypes">'
			+'				</div>'
			+'			</div>'
			+'			<div class="form-group">'
			+'				<label class="col-xs-2 control-label">特殊技能</label>'
			+'				<div class="col-xs-10 form-control-static" id="calc_specialattacks">'
			+'					<span class="colorcell type-斗 option-off" data-value="560">飞行压制</span>'
			+'					<span class="colorcell type-冰 option-off" data-value="573">冷冻干燥</span>'
			//+'					<span class="colorcell type-水 option-off" data-value="592">蒸汽喷发</span>'
			+'				</div>'
			+'			</div>'
			+'			<div class="form-group">'
			+'				<label class="col-xs-2 control-label">自身属性</label>'
			+'				<div class="col-xs-10 form-control-static" id="calc_selftypes">'
			+'				</div>'
			+'			</div>'
			+'			<div class="form-group">'
			+'				<label class="col-xs-2 control-label">抵抗系数</label>'
			+'				<div class="col-xs-10 btn-group" data-toggle="buttons">'
			+'					<label class="btn btn-default"><input type="radio" name="calc_resrate" value="75" >＜75%</label>'
			+'					<label class="btn btn-default active"><input type="radio" name="calc_resrate" value="100" checked>＜100%</label>'
			+'					<label class="btn btn-default"><input type="radio" name="calc_resrate" value="101" >≤100%</label>'
			+'				</div>'
			+'			</div>'
			+'			<div class="form-group">'
			+'				<label class="col-xs-2 control-label">特殊规则</label>'
			+'				<div class="col-xs-10 btn-group" data-toggle="buttons">'
			+'					<label class="btn btn-default"><input type="checkbox" id="calc_revert">反转对战</label>'
			+'				</div>'
			+'			</div>'
			+'			<div class="form-group">'
			+'				<div class="col-xs-offset-2 col-xs-10">'
			+'					<button type="button" class="btn btn-primary" id="calc">计算</button>'
			+'				</div>'
			+'			</div>'
			+'		</form>'
			+'	</div>'
			+'	<div class="col-lg-6" id="calc_results">'
			+'		<table class="table col-lg-12 table-condensed text-center">'
			+'			<thead>'
			+'				<tr><th style="width:10%">编号</th><th style="width:40%">精灵</th><th style="width:20%">属性</th><th style="width:20%">最高倍率</th></tr>'
			+'			</thead>'
			+'			<tbody id="calc_resultbody">'
			+'			</tbody>'
			+'		</table>'
			+'	</div>'
			+'</div></div>'
			+'';
		$(".pw-jscontent").html(htmlDex);
		
		$('#pokedex-show').click(function(){
			var selectedType = parseInt($('select[name=pokedex-type]').val());
			var selectedAbility = parseInt($('select[name=pokedex-ability]').val());
			var selectedGeneration = parseInt($('select[name=pokedex-generation]').val());
			var display =  parseInt($('input[name=pokedex-display]:checked').val());
			var html='';
	
			if ( display == 1 ) html += '<tr><td colspan="14">';
	
			$.each( pokeWiki.database.pokemon.data[7], function( pkmnID, pkmnData ) {
				if ( selectedType > -1 && $.inArray( selectedType, pkmnData.t )==-1  ) return;
				if ( selectedAbility > 0 && $.inArray( selectedAbility, pkmnData.a )==-1  ) return;
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
			$('.pokedex-results tbody').html(html);
		});

	},
	
	checkHash: function(){
		if ( window.location.hash ) {
			var hash = decodeURI(window.location.hash.slice(1).replace(/\./g,'%'));
			var t = $.inArray( hash, pokeWiki.database.types.names['zh-cn'] );
	
			if ( t > -1 ) {
				$('select[name=pokedex-type]').val(t);
				$('#pokedex-show').click();
			} else {
				var a = $.inArray( hash, pokeWiki.database.abilities.names['zh-cn'] );
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
		pw.loader.using( [ 'pokemon.js', 'pokemon.7.js', 'uikit'], function(){
			pokedex.genNames = [''];
			for(var g=1;g<pw.info.maxPokemonCounts.length;g++){
				pokedex.genNames[g] = '第' + '零一二三四五六七八九十'[g] + '世代';
			}
			
			pokedex.createPanel();
			pokedex.checkHash();
		});
	}(),
	
}