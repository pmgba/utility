var
	TYPE_NORMAL   =  0,
	TYPE_FIGHTING =  1,
	TYPE_FLYING   =  2,
	TYPE_POISON   =  3,
	TYPE_GROUND   =  4,
	TYPE_ROCK     =  5,
	TYPE_BUG      =  6,
	TYPE_GHOST    =  7,
	TYPE_STEEL    =  8,
	TYPE_FIRE     =  9,
	TYPE_WATER    = 10,
	TYPE_GRASS    = 11,
	TYPE_ELECTRIC = 12,
	TYPE_PSYCHIC  = 13,
	TYPE_ICE      = 14,
	TYPE_DRAGON   = 15,
	TYPE_DARK     = 16,
	TYPE_FAIRY    = 17
;

var
	ATTACK_FLYINGPRESS = 560,
	ATTACK_FREEZEDRY = 573
;

calc = {
	typeEffects : {
	7 : [
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 0.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0 ], 
		[ 2.0, 1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 0.5 ], 
		[ 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0 ], 
		[ 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 0.5, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0 ], 
		[ 1.0, 1.0, 0.0, 2.0, 1.0, 2.0, 0.5, 1.0, 2.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0 ], 
		[ 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0 ], 
		[ 1.0, 0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 2.0, 0.5 ], 
		[ 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 1.0 ], 
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0, 1.0, 2.0 ], 
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 0.5, 0.5, 2.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0 ], 
		[ 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0 ], 
		[ 1.0, 1.0, 0.5, 0.5, 2.0, 2.0, 0.5, 1.0, 0.5, 0.5, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0 ], 
		[ 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 0.5, 1.0, 1.0 ], 
		[ 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 0.0, 1.0 ], 
		[ 1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 2.0, 1.0, 1.0, 0.5, 2.0, 1.0, 1.0 ], 
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.0 ], 
		[ 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5 ], 
		[ 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0 ]
	]
	},

	createPokemonRow : function(pid, value) {
		var tr = '';
		var num = pid.split('.');
		var name = pw.util.getPokemonName( pid );
		var data = pw.database.pokemon.data[7][pid];

		tr += '<tr style="line-height:30px;">';
		tr += '<td>' + pw.sprite.create( 'pi', pid ) + '</td>';
		tr += '<td>#'+num[0]+'</td>';
		tr += '<td><a href="'+mw.util.getUrl(name.name)+'">'+name.fullname+'</a></td>';
 
		var type = pw.util.createColorlabel( 'span', 'type', pw.database.types.names['zh-cn'][data.types[0]] );
		if ( data.types[0] != data.types[1] ) type += pw.util.createColorlabel( 'span', 'type', pw.database.types.names['zh-cn'][data.types[1]] );
		tr += '<td>'+type+'</td>';
		tr += '<td>'+value+'</td>';
		
		tr += '</tr>';
		return tr;
	},
	
	createPanel : function(){
		var html = ''
			+'<div class="card pokedex">'
			+'<div class="card-header">打击面查询器</div>'
			+'<div class="card-body">'
			+'<div class="container-fluid">'
			+'	<form class="form-horizontal" role="form">'
			+'		<div class="row">'
			+'			<div class="col-12 col-lg-6">'
			+'				<div class="row form-group">'
			+'					<label class="col-2 control-label">招式1：</label>'
			+'					<div class="col-10"><select class="form-control calc-move"></select></div>'
			+'				</div>'
			+'				<div class="row form-group">'
			+'					<label class="col-2 control-label">招式2：</label>'
			+'					<div class="col-10"><select class="form-control calc-move"></select></div>'
			+'				</div>'
			+'				<div class="row form-group">'
			+'					<label class="col-2 control-label">招式3：</label>'
			+'					<div class="col-10"><select class="form-control calc-move"></select></div>'
			+'				</div>'
			+'				<div class="row form-group">'
			+'					<label class="col-2 control-label">招式4：</label>'
			+'					<div class="col-10"><select class="form-control calc-move"></select></div>'
			+'				</div>'
			+'				<div class="row form-group">'
			+'					<label class="col-2 control-label">自身属性：</label>'
			+'					<div class="col-5"><select class="form-control calc-selfType"></select></div>'
			+'					<div class="col-5"><select class="form-control calc-selfType"></select></div>'
			+'				</div>'
			+'				<div class="row form-group">'
			+'					<label class="col-2 control-label">抵抗系数：</label>'
			+'					<div class="col-10 btn-group" data-toggle="buttons">'
			+'						<label class="btn btn-default"><input type="radio" name="calc-resRate" class="calc-resRate" value="75" >＜75%</label>'
			+'						<label class="btn btn-default active"><input type="radio" name="calc-resRate" class="calc-resRate" value="100" checked>＜100%</label>'
			+'						<label class="btn btn-default"><input type="radio" name="calc-resRate" class="calc-resRate" value="101" >≤100%</label>'
			+'					</div>'
			+'				</div>'
			+'				<div class="row form-group">'
			+'					<label class="col-2 control-label">特殊规则：</label>'
			+'					<div class="col-10 btn-group" data-toggle="buttons">'
			+'						<label class="btn btn-default"><input type="checkbox" class="calc-revert">反转对战</label>'
			+'					</div>'
			+'				</div>'
			+'				<ht />'
			+'				<div class="row form-group">'
			+'					<div class="col-offset-2 col-10">'
			+'						<button type="button" class="btn btn-primary" id="calc">计算</button>'
			+'					</div>'
			+'				</div>'
			+'			</div>'
			
			+'	<div class="col-lg-6">'
			+'		<table class="table col-lg-12 table-condensed text-center calc-results">'
			+'			<thead>'
			+'				<tr><th style="width:10%">图标</th><th style="width:10%">编号</th><th style="width:40%">宝可梦</th><th style="width:20%">属性</th><th style="width:20%">最高倍率</th></tr>'
			+'			</thead>'
			+'			<tbody id="calc_resultbody">'
			+'			</tbody>'
			+'		</table>'
			+'	</div>'
			+'';
		$(".pw-jscontent").html(html);
		
		var html = '',html2='';
		var typeArr = [];
		typeArr.push([-1,'-']);
		$.each(pw.database.types.names['zh-cn'], function(i,v){
			typeArr.push([i,v]);
		});
		$.each(typeArr, function(i,v){
			html2 += '<option value="' + v[0] + '">' + v[1] + '</option>';
		});
		typeArr.push([ATTACK_FLYINGPRESS,'飞身重压']);
		typeArr.push([ATTACK_FREEZEDRY,'冷冻干燥']);
		$.each(typeArr, function(i,v){
			html += '<option value="' + v[0] + '">' + v[1] + '</option>';
		});
		$('.calc-move').html(html);
		$('.calc-selfType').html(html2);
		
		
		$('#calc').click(calc.calc);

	},
	
	getRevertEffect : function(eff) {
		if ( eff == 0 ) return 2;
		else if ( eff == 2 ) return 0.5;
		else if ( eff == 0.5 ) return 2;
		else return eff;
	},
	
	calcTypeEffect : function (AttackType, DefendType1, DefendType2, Ability, STAB, Revert) {
		var m = 1;
		if ( Revert ) {
			m = calc.getRevertEffect(calc.typeEffects[7][AttackType][DefendType1]);
			if ( DefendType2!=DefendType1 ) m *= calc.getRevertEffect(calc.typeEffects[7][AttackType][DefendType2]);
		} else {
			m = calc.typeEffects[7][AttackType][DefendType1];
			if ( DefendType2!=DefendType1 ) m *= calc.typeEffects[7][AttackType][DefendType2];
		}
		switch (Ability){
			case 0:
				break;
			case 10: //蓄电
				if (AttackType == TYPE_ELECTRIC) m = 0;
				break;
			case 11: //贮水
				if (AttackType == TYPE_WATER) m = 0;
				break;
			case 18: //引火
				if (AttackType == TYPE_FIRE) m = 0;
				break;
			case 25: //奇异守护
				if (m <= 1) m = 0;
				break;
			case 26: //浮游
				if (AttackType == TYPE_GROUND) m = 0;
				break;
			case 31: //避雷针
				if (AttackType == TYPE_ELECTRIC) m = 0;
				break;
			case 47: //厚脂肪
				if (AttackType == TYPE_FIRE) m /= 2;
				if (AttackType == TYPE_ICE) m /= 2;
				break;
			case 78: //电引擎
				if (AttackType == TYPE_ELECTRIC) m = 0;
				break;
			case 85: //耐热
				if (AttackType == TYPE_FIRE) m /= 2;
				break;
			case 87: //干燥肌肤
				if (AttackType == TYPE_WATER) m = 0; 
				else if (AttackType == TYPE_FIRE) m *= 1.25;
				break;
			case 111: //过滤器
				if (m > 1) m *= 0.75;
				break;
			case 114: //引水
				if (AttackType == TYPE_WATER) m = 0;
				break;
			case 116: //坚岩
				if (m > 1) m *= 0.75;
				break;
			case 157: //食草
				if (AttackType == TYPE_GRASS) m = 0;
				break;
		}
		if (STAB) m*=1.5;
		return m;
	},
	
	calc: function(){
		var attackTypes = [];
		var specialAttacks = [];
		var selfTypes = [];
		$('.calc-move').each(function(){
			var val = parseInt($(this).val(),10);
			if ( val > 100 ) specialAttacks.push(val);
			else if ( val > -1 ) attackTypes.push(val);
		});
		$('.calc-selfType').each(function(){
			var val = parseInt($(this).val(),10);
			if ( val > -1 ) selfTypes.push(val);
		});
		
		var isRevert = $('.calc-revert')[0].checked;
		var resRate = parseInt($('.calc-resRate:checked').val(),10) / 100;
		var hasFlyingPress = specialAttacks.indexOf(ATTACK_FLYINGPRESS)>=0;
		var hasFreezeDry = specialAttacks.indexOf(ATTACK_FREEZEDRY)>=0;
	
		var tbody = '';
		$.each( pw.database.pokemon.data[7], function(k,data) {
			var r = [];
			$.each( data.abilities, function(j,a) {
				var t = [];
				$.each( attackTypes,function(i, attackType) {
					var isStab = selfTypes.indexOf(attackType)>=0;
					t[i] = calc.calcTypeEffect( attackType, data.types[0], data.types[1], a, isStab, isRevert);
				});
				if ( hasFlyingPress ) {
					var isStab = selfTypes.indexOf(TYPE_FIGHTING)>=0;
					t.push(calc.calcTypeEffect( TYPE_FIGHTING, data.types[0], data.types[1], a, isStab, isRevert) * calc.calcTypeEffect( TYPE_FLYING, data.types[0], data.types[1], a, false, isRevert));
				}
				if ( hasFreezeDry ) {
					var isStab = selfTypes.indexOf(TYPE_ICE)>=0;
					var m = calc.calcTypeEffect( TYPE_ICE, data.types[0], data.types[1], a, isStab, isRevert);
					if ( data.types[0] == TYPE_WATER || data.types[1] == TYPE_WATER ) m *= 4;
					t.push(m);
				}
				r[j] = Math.max.apply(null,t);
			});
			var m = Math.min.apply(null,r);
	
			if ( m < resRate ) tbody += calc.createPokemonRow( k, m );
		});
		$(".calc-results tbody").html(tbody);
	},
	
}

		pw.loader.using( [ 'pokemon.js', 'pokemon.7.js', 'pokemonsprite.js', 'bootstrap'], function(){
			calc.genNames = [''];
			for(var g=1;g<pw.info.maxPokemonCounts.length;g++){
				calc.genNames[g] = '第' + '零一二三四五六七八九十'[g] + '世代';
			}
			
			calc.createPanel();
		});