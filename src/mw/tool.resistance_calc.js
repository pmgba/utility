if(!Array.indexOf) {
	Array.prototype.indexOf = function(obj) {               
		for(var i=0; i<this.length; i++) if(this[i]==obj) return i;
		return -1;
	}
}

pokeWiki.loader.using( [ 'pokemon', 'pokemon/pokemon.7.js' ], function(){

var TYPE_NAMES = ["普","斗","飞","毒","地","岩","虫","鬼","钢","火","水","草","电","超","冰","龙","恶","妖"];

var TYPE_EFFECTS = {
	5 : [
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 0.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0 ], 
		[ 2.0, 1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0 ], 
		[ 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0 ], 
		[ 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 0.5, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0 ], 
		[ 1.0, 1.0, 0.0, 2.0, 1.0, 2.0, 0.5, 1.0, 2.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0 ], 
		[ 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0 ], 
		[ 1.0, 0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 2.0 ], 
		[ 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5 ], 
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0, 1.0 ], 
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 0.5, 0.5, 2.0, 1.0, 1.0, 2.0, 0.5, 1.0 ], 
		[ 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0 ], 
		[ 1.0, 1.0, 0.5, 0.5, 2.0, 2.0, 0.5, 1.0, 0.5, 0.5, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0 ], 
		[ 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 0.5, 1.0 ], 
		[ 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 0.0 ], 
		[ 1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 2.0, 1.0, 1.0, 0.5, 2.0, 1.0 ], 
		[ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0 ], 
		[ 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5 ]
	],
	6 : [
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
};

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
	ATTACK_FREEZEDRY = 573,
	ATTACK_STEAMERUPTION = 592
;

function createCalculator() {
	var html = ''
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
	$(".pw-jscontent").html(html);

		html = '';
	$.each(TYPE_NAMES, function(i,v){
		html += '<span class="colorcell type-' + v + ' option-off" data-value="'+i+'">' + v + '</span>';
	});
	$("#calc_attacktypes").html(html);
	$("#calc_selftypes").html(html);

	$(".colorcell").click(function(){
		$(this).toggleClass('option-off option-on');
	});
	mw.util.addCSS( ''
+'.option-off {'
+'	background-color: white !important;'
+'	color: #666 !important;'
+'	border-color: #999 !important;'
+'}'
+'.colorcell {'
+'	cursor: pointer;'
+'}'
+'.table-condensed td {'
+'	padding: 2px 0 3px 0;'
+'}'
	);
}

function getRevertEffect(eff) {
	if ( eff == 0 ) return 2;
	else if ( eff == 2 ) return 0.5;
	else if ( eff == 0.5 ) return 2;
	else return eff;
}
function calcTypeEffect(AttackType, DefendType1, DefendType2, Ability, STAB, Revert) {
	var m = 1;
	if ( Revert ) {
		m = getRevertEffect(TYPE_EFFECTS[6][AttackType][DefendType1]);
		if ( DefendType2!=DefendType1 ) m *= getRevertEffect(TYPE_EFFECTS[6][AttackType][DefendType2]);
	} else {
		m = TYPE_EFFECTS[6][AttackType][DefendType1];
		if ( DefendType2!=DefendType1 ) m *= TYPE_EFFECTS[6][AttackType][DefendType2];
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
}


createCalculator();

$('#calc').click(function(){
	if ( $('#calc_attacktypes .option-on, #calc_specialattacks .option-on').length == 0 ) return;
	var attackTypes = [];
	var specialAttacks = [];
	var selfTypes = [];
	$('#calc_attacktypes .option-on').each(function(i,v){ attackTypes.push(parseInt($(this).data('value'))); });
	$('#calc_specialattacks .option-on').each(function(i,v){ specialAttacks.push(parseInt($(this).data('value'))); });
	$('#calc_selftypes .option-on').each(function(i,v){ selfTypes.push(parseInt($(this).data('value'))); });
	var isRevert = $('#calc_revert')[0].checked;
	var resrate = parseInt($('input[name=calc_resrate]:checked').val()) / 100;
	var hasFlyingPress = specialAttacks.indexOf(ATTACK_FLYINGPRESS)>=0;
	var hasFreezeDry = specialAttacks.indexOf(ATTACK_FREEZEDRY)>=0;
	var hasSteamEruption = specialAttacks.indexOf(ATTACK_STEAMERUPTION)>=0;

	var tbody = '';
	$.each( pw.database.pokemon.data[6], function(k,data) {
		var r = [];
		$.each( data['a'], function(j,a) {
			var t = [];
			$.each( attackTypes,function(i, attackType) {
				var isStab = selfTypes.indexOf(attackType)>=0;
				t[i] = calcTypeEffect( attackType, data['t'][0], data['t'][1], a, isStab, isRevert);
			});
			if ( hasFlyingPress ) {
				var isStab = selfTypes.indexOf(TYPE_FIGHTING)>=0;
				t.push(calcTypeEffect( TYPE_FIGHTING, data['t'][0], data['t'][1], a, isStab, isRevert) * calcTypeEffect( TYPE_FLYING, data['t'][0], data['t'][1], a, false, isRevert));
			}
			if ( hasFreezeDry ) {
				var isStab = selfTypes.indexOf(TYPE_ICE)>=0;
				var m = calcTypeEffect( TYPE_ICE, data['t'][0], data['t'][1], a, isStab, isRevert);
				if ( data['t'][0] == TYPE_WATER || data['t'][1] == TYPE_WATER ) m *= 4;
				t.push(m);
			}
			if ( hasSteamEruption ) {
				var isStab = selfTypes.indexOf(TYPE_WATER)>=0;
				var m = calcTypeEffect( TYPE_WATER, data['t'][0], data['t'][1], a, isStab, isRevert) * calcTypeEffect( TYPE_FIRE, data['t'][0], data['t'][1], a, false, isRevert);
				if ( a == 25 ) m = 2;
				t.push(m);
			}
			r[j] = Math.max.apply(null,t);
		});
		var m = Math.min.apply(null,r);

		if ( m < resrate ) {
			var num = k.split('.')[0];
			var name = pw.util.getPokemonName(k);
			var a = '<a href="/wiki/'+name[0]+'">'+name[2]+'</a>';
			var type = '<span class="colorcells"><span class="colorcell type-'+TYPE_NAMES[data['t'][0]]+'">'+TYPE_NAMES[data['t'][0]]+'</span>';
			if ( data['t'][0] != data['t'][1] ) type += '<span class="colorcell type-'+TYPE_NAMES[data['t'][1]]+'">'+TYPE_NAMES[data['t'][1]]+'</span>';
			type += '</span>';
			tbody += '<tr><td>#'+num+'</td><td>'+a+'</td><td>'+type+'</td><td>'+m+'</td></tr>';
		}
	});
	$("#calc_resultbody").html(tbody);
});

});