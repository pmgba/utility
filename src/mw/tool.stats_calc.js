// [[分类:脚本文件]]
// 这个文件由[[Stats calculator]]调用。

pokeWiki.loader.using( [ 'pokemon.js', 'pokemon.7.js' ], function(){

var Color_Name = ["red","blue","yellow","green","black","brown","purple","gray","white","pink"];

var table='';
table+='<table class="colortable pokemoncolor" id="calc" style="text-align:center;width:560px">';
table+='<tr><th style="width:200px">精灵</td><th style="width:50px">能力</td><th>种族值</td><th>个体值</td><th>努力值</td><th>性格</td><th style="width:50px">能力值</td></tr>';
for (i=0;i<=5;i++) {
	table+='<tr>';
	if (i==0) table+='<td id="Sprite" rowspan="6">&nbsp;</td>';
	table+='<td>'+['HP','攻击','防御','特攻','特防','速度'][i]+'</td>';
	table+='<td class="input"><input type="text" class="BS" value="0" maxlength="3" onkeyup="CalcSingle('+i+');"></td>';
	table+='<td class="input"><input type="text" class="IV" value="31" maxlength="3" onkeyup="CalcSingle('+i+');"></td>';
	table+='<td class="input"><input type="text" class="EV" value="0" maxlength="3" onkeyup="CalcSingle('+i+');ChangeEVs();"></td>';
	if (i==0) {table+='<td style="font-size:90%">＋　－</td>'}else{table+='<td><input type="radio" class="Nature1" name="NatureP" onclick="CalcAll();" value="'+(i-1)+'"><input type="radio" class="Nature2" name="NatureM" onclick="CalcAll();" value="'+(i-1)+'"></td>'};
	table+='<td class="Stat">&nbsp;</td></tr>';
}
table+='<tr><td class="select">';
//table+='<select id="gen" onChange="SelectGen(value)" style="width:40px"><option value=0 selected></option>';
//for (i=1;i<=6;i++) { table+='<option value='+i+' >'+i+'</option>'; }
//table+='</select>';
table+='<select id="pokemon" onChange="SelectPokemon(value)" style="width:120px">';
table+='</select>';
table+='<select id="form" onChange="SelectForm(value)" style="width:70px"></select>';
table+='</td>';
table+='<td>等级</td><td class="input"><input type="text" id="LV" value="100" maxlength="3" onkeyup="CalcAll();"></td>';
table+='<td class="select"><select onChange="SelectIVs(value)"><option value=31 selected>全31</option><option value=0 >全0</option></select></td>';
table+='<td class="select"><select onChange="SelectEVs(value)">';
table+='<option value="0/0/0/0/0/0" selected>全0</option>';
table+='<option value="252/0/0/0/0/252">HPSP</option>';
table+='<option value="0/252/0/0/0/252">ATSP</option>';
table+='<option value="0/0/0/252/0/252">SASP</option>';
table+='<option value="252/0/252/0/0/0">HPDF</option>';
table+='<option value="252/0/0/0/252/0">HPSD</option>';
table+='<option value="0/0/252/0/252/0">DFSD</option>';
table+='<option value="252/252/252/252/252/252">全满</option>';
table+='</select></td>';
table+='<td class="select"><select onChange="SelectNature(value)">';
var n_v = ["0/0","0/0","0/1","0/2","0/3","0/4","0/0","1/0","1/1","1/2","1/3","1/4","0/0","2/0","2/1","2/2","2/3","2/4","0/0","3/0","3/1","3/2","3/3","3/4","0/0","4/0","4/1","4/2","4/3","4/4"];
var n_n = ["----","努力","寂寞","固执","顽皮","勇敢","----","大胆","坦率","淘气","无虑","悠闲","----","谨慎","温和","腼腆","马虎","冷静","----","安静","温顺","慎重","浮躁","傲慢","----","胆小","急躁","开朗","天真","认真"];
for (i=0;i<n_v.length;i++) {
	table+='<option value="'+n_v[i]+'">'+n_n[i]+'</option>';
}
table+='</select></td><td>&nbsp;</td></tr>';
table+='<tr><td colspan="7"><input type="text" id="URL" style="width:540px;text-align:left" onfocus="$(this).select();" ></td></tr>';
table+='<tr><th colspan="7" style="font-size:88%;line-height:14px;font-weight:normal"><span id="msg" style="float:left"></span><span id="msg_ev" style="float:right"></span></th></tr>';
table+='</table>';
$(".pw-jscontent").html(table);

////////////////////

var Working = false;
var $BSs = $('input.BS');
var $EVs = $('input.EV');
var $IVs = $('input.IV');
var $Stats = $('td.Stat');
var $LV = $('input#LV');
var N1 = document.getElementsByName('NatureP');
var N2 = document.getElementsByName('NatureM');


var formcounts = {};
for (i=0;i<=pw.util.getInfo('maxPokemonCount');i++) {
	formcounts[String('00').concat(i).slice(-3)]=0;
}
$.each(pw.database.pokemon.data[7],function(k,v){
	var x = k.split('.');
	formcounts[x[0]] += 1;
});

window.SelectGen = function( gen ) {
	gen = parseInt(gen);
	var maxPokemonCounts = pw.util.getInfo('maxPokemonCounts');
	var num_begin = maxPokemonCounts[gen-1]+1, num_end = maxPokemonCounts[gen];
	if ( gen == 0 ) {
		num_begin = 1;
		num_end = pw.util.getInfo('maxPokemonCount');
	}
	var options = '<option value=0 selected></option>';
	for (i=num_begin;i<=num_end;i++) {
		options += '<option value='+i+' >'+ String('00').concat(i).slice(-3) +' '+pw.util.getPokemonName(i)+'</option>';
	}
	$('#pokemon').empty().html(options);
	SelectPokemon(0);
}

window.SelectPokemon = function(num) {
	$('#form').empty();
	if ( num == 0 ) {
		$('#Sprite').html('&nbsp;');
	}else{
		var p = String('00').concat(num).slice(-3);
		var options = '';
		for (i=0;i<formcounts[p];i++) {
			var key = p + '.' + String('00').concat(i).slice(-2);
			var name = pw.util.getPokemonName(key);
			options += '<option value='+key+' >'+ ( name[1].length>0 ? name[1] : name[0] ) +'</option>';
		}
		$('#form').html(options);
		SelectForm(p.concat('.00'));
		var color = pw.database.pokemon.colors[num];
		$("#calc").attr('class','colortable pokemoncolor pokemoncolor-'+Color_Name[color]);
	}
}

window.SelectForm = function(key) {
	var num = parseInt(key.split('.')[0]);
	$('#Sprite').html('<a href="/wiki/' + pw.util.getPokemonName(num)+ '" title="' + pw.util.getPokemonName(num) + '">' + pw.util.createPokemonImage('pgl',key,'width:80%;') + '</a>');
	var bs = pw.util.rearrangeBaseStats(pw.database.pokemon.data[7][key]['b']);
	for ( i=0;i<=5;i++ ) {
		$BSs[i].value=bs[i];
	}
	CalcAll();
}

SelectGen(0);

window.SelectIVs = function(value) {
	$IVs.val(value);
	CalcAll();
}

window.SelectEVs = function(value) {
	var EVs=value.split("/");
	for ( i=0;i<=5;i++ ) {
		$EVs[i].value=EVs[i];
	}
	CalcAll();
	ChangeEVs();
}

window.ChangeEVs = function() {
	var sum_evs = 0;
	for ( var i = 0; i <= 5; i++) { sum_evs += parseInt($EVs[i].value);}
	if ( sum_evs == 0 ) {
		$('#msg_ev').html('');
	} else if ( sum_evs < 508 ) {
		$('#msg_ev').html('努力值总和'+sum_evs+'，剩余'+(510-sum_evs));
	} else if ( sum_evs > 510 ) {
		$('#msg_ev').html('努力值总和'+sum_evs+'，超出'+(sum_evs-510));
	} else {
		$('#msg_ev').html('努力值总和'+sum_evs);
	}
}

window.SelectNature = function(value) {
	var N=value.split("/");
	if (N[0]==N[1]) {
		for (i=0;i<=4;i++){
			N1[i].checked=false;
			N2[i].checked=false;
		}
	}else{
		N1[N[0]].checked=true;
		N2[N[1]].checked=true;
	}
	CalcAll();
}

window.CalcAll = function() {
	Working = true;
	for (var i=0;i<=5;i++ ) {
		CalcSingle(i);
	}
	Working = false;
	CreateURL();
}

window.CalcSingle = function(S){
	var Nature = [1,1,1,1,1];
	for (var i=0;i<=4;i++){
		if (N1[i].checked&&N2[i].checked) break;
		if (N1[i].checked) Nature[i]=1.1;
		if (N2[i].checked) Nature[i]=0.9;
	}
	$Stats[S].innerHTML=Calc($LV.val(), $BSs[S].value, $EVs[S].value, $IVs[S].value, (S==0)?0:Nature[S-1] );
	if ( !Working ) CreateURL();
}

function Calc(LV, BS, EV, IV, Nature) {
	if (LV == 0) return 0;
	if (BS == 0) return 0;
	if (BS == 1) return 1;
	LV=parseInt(LV);
	BS=parseInt(BS);
	EV=parseInt(EV);
	IV=parseInt(IV);
	var s;
	if (Nature == 0) {
		s = Math.floor((BS*2+IV+Math.floor(EV/4))*LV/100+10+LV);
	} else {
		s = Math.floor((BS*2+IV+Math.floor(EV/4))*LV/100+5);
		s = Math.floor(s*Nature);
	}
	return s;
}

function CreateURL() {
	var url = 'http://www.pokemon.name/w/index.php?title=' + mw.config.get('wgPageName');
	if ($("#pokemon")[0].selectedIndex > 0) url += '&pid=' + $("#pokemon")[0].selectedIndex;
	if ($LV.val()!=100) url += '&plv=' + $LV.val();
	var IVs='';
	for ( var i = 0; i <= 5; i++) { IVs += ',' + $IVs[i].value;}
	if ( IVs != ',31,31,31,31,31,31' ) url += '&piv=' + IVs.substring(1);
	var EVs='';
	for ( var i = 0; i <= 5; i++) { EVs += ',' + $EVs[i].value;}
	if ( EVs != ',0,0,0,0,0,0' ) url += '&pev=' + EVs.substring(1);
	var PN1=0;
	var PN2=0;
	for ( var i = 0; i <= 4; i++) {
		if (N1[i].checked && N2[i].checked) break;
		if (N1[i].checked) PN1=i+1;
		if (N2[i].checked) PN2=i+1;
	}
	if ( PN1+PN2>0 ) url += '&pn=' + PN1 + ',' + PN2;
	$('#URL').val(url);
}

////////////////////

if ( window.location.href.indexOf('/w/') > 1 ) {
	var params = window.location.href.substring(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < params.length; i++) {
		var param = params[i].split('=');
		switch ( param[0] ) {
			case 'pid':
				$("#pokemon")[0].selectedIndex = param[1];
				break;
			case 'plv':
				$LV.val(param[1]);
				break;
			case 'piv':
				var ivs=param[1].split(',');
				for ( var j = 0; j <= 5; j++) {
					$IVs[j].value = ivs[j];
				}
				break;
			case 'pev':
				var evs=param[1].split(',');
				for ( var j = 0; j <= 5; j++) {
					$EVs[j].value = evs[j];
				}
				ChangeEVs();
				break;
			case 'pn':
				var pn = param[1].split(',');
				if (pn[0]>0) N1[pn[0]-1].checked = true;
				if (pn[1]>0) N2[pn[1]-1].checked = true;
				break;
		}
	}
	if ($("#pokemon")[0].selectedIndex > 0) { SelectPokemon($("#pokemon")[0].selectedIndex); } else { CalcAll(); }
}

//////////////////////////////

$('#msg').html('装载完毕');

});