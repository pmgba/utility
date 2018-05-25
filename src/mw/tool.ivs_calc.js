// [[分类:脚本文件]]
// 这个文件由[[Iv calculator]]调用。

pw.loader.using( [ 'pokemon.js', 'pokemon.7.js' ], function(){

var COLORNAMES = ["red","blue","yellow","green","black","brown","purple","gray","white","pink"];

////////////////////

var table='';
table+='<table class="colortable pokemoncolor" id="calc" style="text-align:center;width:560px">';
table+='<tr><th style="width:200px">精灵</td><th style="width:50px">能力</td><th>种族值</td><th>努力值</td><th>性格</td><th>能力值</td><th style="width:50px">个体值</td></tr>';
for (i=0;i<=5;i++) {
	table+='<tr>';
	if (i==0) table+='<td id="Sprite" rowspan="6">&nbsp;</td>';
	table+='<td>'+['HP','攻击','防御','特攻','特防','速度'][i]+'</td>';
	table+='<td class="input"><input type="text" class="BS" value="0" maxlength="3" onkeyup="CalcSingle('+i+');"></td>';
	table+='<td class="input"><input type="text" class="EV" value="0" maxlength="3" onkeyup="CalcSingle('+i+');"></td>';
	if (i==0) {table+='<td style="font-size:90%">＋　－</td>'}else{table+='<td><input type="radio" class="Nature1" name="NatureP" onclick="CalcAll();" value="'+(i-1)+'"><input type="radio" class="Nature2" name="NatureM" onclick="CalcAll();" value="'+(i-1)+'"></td>'};
	table+='<td class="input"><input type="text" class="Stat" maxlength="3" onkeyup="CalcSingle('+i+');"></td>';
	table+='<td class="IV">&nbsp;</td></tr>';
}
table+='<tr><td class="select">';
//table+='<select id="gen" onChange="SelectGen(value)" style="width:40px"><option value=0 selected></option>';
//for (i=1;i<=6;i++) { table+='<option value='+i+' >'+i+'</option>'; }
//table+='</select>';
table+='<select id="pokemon" onChange="SelectPokemon(value)" style="width:120px">';
table+='</select>';
table+='<select id="form" onChange="SelectForm(value)" style="width:70px"></select>';
table+='</td>';
table+='<td>等级</td><td class="input"><input type="text" id="LV" value="1" maxlength="3" onkeyup="CalcAll();"></td>';
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
for (var i=0;i<n_v.length;i++) { table+='<option value="'+n_v[i]+'">'+n_n[i]+'</option>'; }
table+='</select></td><td id="HP">&nbsp;</td><td id="IV_SUM" style="padding:0;font-size:88%">&nbsp;</td></tr>';
table+='<tr><th colspan=7><hr/></th></tr>';
table+='<tr class="advance"><th>个性</th><th colspan=6 style="padding:0"><select id="Characteristic" style=width:100% onChange="CreateURL()" >'
n_v = ["","0/0","0/1","0/2","0/3","0/4","0/5","1/0","1/1","1/2","1/3","1/4","1/5","2/0","2/1","2/2","2/3","2/4","2/5","3/0","3/1","3/2","3/3","3/4","3/5","4/0","4/1","4/2","4/3","4/4","4/5"];
n_n = ["","非常贪吃","以力量自豪","身体结实","喜欢奔跑","好奇心强","心意坚定","经常午睡（HP个体值31对应个性）","喜欢乱闹（攻击个体值31对应个性）","很耐打（防御个体值31对应个性）","对动静很敏感（速度个体值31对应个性）","喜欢恶作剧（特攻个体值31对应个性）","有点爱虚荣（特防个体值31对应个性）","常常打盹","有点易怒","韧性高","轻浮冒失","顾虑周全","很不服输","经常弄乱东西","喜欢吵架","耐性强","容易自满","思虑很多","好强","喜欢悠闲","容易激动","忍耐力强","逃跑很快","一丝不苟","有点顽固"];
for (var i=0;i<n_v.length;i++) { table+='<option value="'+n_v[i]+'">'+n_n[i]+'</option>'; }
table+='</select></th></tr>';
table+='<tr class="advance"><th>觉醒力量</th><th colspan=6 style="padding:0"><select id="HPType" style=width:100% onChange="CreateURL()"><option selected> </option>';
for (var i=0;i<pw.database.types.names['zh-cn'];i++) {table+='<option>'+pw.database.types.names['zh-cn'][i]+'</option>';}
table+='</select></th></tr>';
table+='<tr class="advance"><th>个体值总和</th><th colspan=6 style="padding:0"><select id="SumIVs" style=width:100% onChange="CreateURL()">';
table+='<option value=-1 selected> </option>';
table+='<option value=150 >拥有非常棒的能力(151+)</option>';
table+='<option value=120 >拥有相当优秀的能力(121+)</option>';
table+='<option value=90 >拥有平均以上的能力(91+)</option>';
table+='<option value=0 >拥有还行的能力(90-)</option>';
table+='</select></th></tr>';
table+='<tr class="advance"><th rowspan=2>最高项个体值</th><th colspan=6 style="padding:0"><select id="HighestIV" style=width:100% onChange="CreateURL()">';
table+='<option selected> </option>';
table+='<option>拥有最高的力量(31)</option>';
table+='<option>拥有很棒的力量(25+)</option>';
table+='<option>拥有相当的力量(15+)</option>';
table+='<option>拥有还好的力量(14-)</option>';
table+='</select></th></tr>';
table+='<tr class="advance"><td colspan=6>';
for (var i=0;i<=5;i++) { table+='<input type="checkbox" class="Highest" onClick="CreateURL()"/> '+['HP','攻击','防御','特攻','特防','速度'][i]; }
table+='</td></tr>';
table+='<tr class="advance"><th><input type="button" value="计算所有可能性分布" onclick="CalcDetails();" /></th></td>';
table+='<th colspan=6 style=font-weight:normal>计算结果只显示前<input type="text" id="MaxResults" value="100" maxlength="5" style="width:40px;text-align:center">项</th></tr>';
table+='<tr class="advance"><td class="details" colspan=7 style="padding:5px;vertical-align:top">';
table+='<div style="overflow-y: scroll;height: 100%; width:100%; style=text-align:center">';
table+='<div id="details"></div></div></td></tr>';
table+='<tr class="toggle"><th colspan="7"><input type="button" style="width:74%;" onclick="$(\'tr.advance\').show();$(\'tr.toggle\').hide();" value="高级选项"><input type="button" style="width:24%;" onclick="calcStats();" value="能力值反查"></th></tr>';
table+='<tr><td colspan="7"><input type="text" id="URL" style="width:540px;text-align:left" onfocus="$(this).select();" ></td></tr>';
table+='</table>';

$(".pw-jscontent").html(table);
$("tr.advance").hide();

////////////////////
//var CharacteristicIVs=[[0,5,10,15,20,25,30],[1,6,11,16,21,26,31],[2,7,12,17,22,27],[3,8,13,18,23,28],[4,9,14,19,24,29]];

var Working = false;
var $BSs = $('input.BS');
var $EVs = $('input.EV');
var $IVs = $('td.IV');
var $Stats = $('input.Stat');
var $LV = $('input#LV');
var N1 = document.getElementsByName('NatureP');
var N2 = document.getElementsByName('NatureM');
var minIVs=[-1,-1,-1,-1,-1,-1];
var maxIVs=[-1,-1,-1,-1,-1,-1];
var HP_Value = [1,2,4,8,16,32];
var hasResults = false;
var isUniqueResult = false;
var digit=/^\d+$/;

var formcounts = {};
for (i=0;i<=802;i++) {
	formcounts[String('00').concat(i).slice(-3)]=0;
}
$.each(pw.database.pokemon.data[7],function(k,v){
	var x = k.split('.');
	formcounts[x[0]] += 1;
});

window.SelectGen = function( num ) {
	var num_begin = 1, num_end = 802;
	switch ( parseInt(num) ) {
		case 1: num_begin = 1;   num_end = 151; break;
		case 2: num_begin = 151; num_end = 251; break;
		case 3: num_begin = 252; num_end = 386; break;
		case 4: num_begin = 387; num_end = 493; break;
		case 5: num_begin = 494; num_end = 649; break;
		case 6: num_begin = 650; num_end = 721; break;
		case 7: num_begin = 722; num_end = 802; break;
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
		$("#calc").attr('class','colortable pokemoncolor pokemoncolor-'+COLORNAMES[color]);
		$("#stats").attr('class','colortable colortable-colborder-single colortable-rowborder-single pokemoncolor pokemoncolor-'+COLORNAMES[color]);
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

window.SelectEVs = function(value) {
	var EVs=value.split("/");
	for ( i=0;i<=5;i++ ) {
		$EVs[i].value=EVs[i];
	}
	CalcAll();
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
	var N = [0,1,1,1,1,1];
	for (i=0;i<=4;i++){
		if (N1[i].checked&&N2[i].checked) break;
		if (N1[i].checked) N[i+1]=1.1;
		if (N2[i].checked) N[i+1]=0.9;
	}
	for (j=0;j<=5;j++){
		CalcIV(j,$LV.val(),$BSs[j].value,$EVs[j].value,$Stats[j].value,N[j]);
	}
	isUniqueResult=true;
	hasResults=true;
	for (var i=0;i<=5;i++){
		if (minIVs[i]==-1){
			isUniqueResult=false;
			hasResults=false;
			$IVs[i].innerHTML = "?";
		} else if (minIVs[i]==maxIVs[i]){
			if ( ($Stats[i].value != CalcStat($LV.val(),$BSs[i].value,$EVs[i].value,minIVs[i],N[j])) ) {
				$('#HP').html( "&nbsp;" );
				$('#IV_SUM').html("&nbsp;" );
				$IVs[i].innerHTML = "?";
				isUniqueResult=false;
				hasResults=false;
			} else {
				$IVs[i].innerHTML = minIVs[i];
			}
		} else {
			isUniqueResult=false;
			$IVs[i].innerHTML = minIVs[i] + "～" + maxIVs[i];
		}
	}
	if(isUniqueResult){
		$('#HP').html(pw.database.types.names['zh-cn'][CalcHPType(YtoX(minIVs))]+" "+CalcHPPower(YtoX(minIVs)));
		$('#IV_SUM').html(eval(minIVs.join("+")));
	}else if (hasResults){
		$('#IV_SUM').html(eval(minIVs.join("+")) + "～" + eval(maxIVs.join("+")));
	}else{
		$('#HP').html("&nbsp;");
		$('#IV_SUM').html("&nbsp;");
	}

	CreateURL();
}

window.CalcSingle = function(S) {
	//if (($('#Characteristic')[0].selectedIndex>0)||($('#HPType')[0].selectedIndex>0)){
	//	CalcAll();
	//	return;
	//}
	var N = 1;
	if (S>0) {
		if (!(N1[S-1].checked&&N2[S-1].checked)) {
			if (N1[S-1].checked) N=1.1;
			if (N2[S-1].checked) N=0.9;
		}
	} else {
		N = 0;
	}
	
	CalcIV(S,$LV.val(),$BSs[S].value,$EVs[S].value,$Stats[S].value,N);

	if (minIVs[S]==-1){
		$IVs[S].innerHTML = "?";
	}else if (minIVs[S]==maxIVs[S]){
		$IVs[S].innerHTML = minIVs[S];
		$('#IV_SUM').html( eval(minIVs.join("+")) );
	}else{
		$IVs[S].innerHTML = minIVs[S] + "～" + maxIVs[S];
		$('#IV_SUM').html( eval(minIVs.join("+")) + "～" + eval(maxIVs.join("+")) );
	}

	isUniqueResult=true;
	hasResults=true;
	for (i=0;i<=5;i++){
		if (minIVs[i]==-1){
			isUniqueResult=false;
			hasResults=false;
		} else if (minIVs[i]==maxIVs[i]){
		} else {
			isUniqueResult=false;
		}
	}
	if ( (minIVs[S]==maxIVs[S]) && ($Stats[S].value != CalcStat($LV.val(),$BSs[S].value,$EVs[S].value,minIVs[S],N)) ) {
		$('#HP').html( "&nbsp;" );
		$('#IV_SUM').html("&nbsp;" );
		$IVs[S].innerHTML = "?";
		isUniqueResult=false;
		hasResults=false;
	}

	if(isUniqueResult){
		$('#HP').html( pw.database.types.names['zh-cn'][CalcHPType(YtoX(minIVs))]+" "+CalcHPPower(YtoX(minIVs)) );
		$('#IV_SUM').html(eval(minIVs.join("+")) );
	}else if (hasResults){
		$('#IV_SUM').html(eval(minIVs.join("+")) + "～" + eval(maxIVs.join("+")) );
	}else{
		$('#HP').html( "&nbsp;" );
		$('#IV_SUM').html("&nbsp;" );
	}

	CreateURL();
}

window.CalcDetails = function() {
	var CheckMax = false;
	var isMax=[false,false,false,false,false,false];
	
	for (i=0;i<=5;i++){
		if (minIVs[i]==-1){
			$('#details').html("<span style=color:red>基础数据不足，无法进行计算。</span>");
			//$('td.details').css('height','auto');
			return;
		}
		if ($('.Highest')[i].checked) {
			CheckMax=true;
			isMax[i]=true;
		}
	}
	isMax=YtoX(isMax);
	minIVs=YtoX(minIVs);
	maxIVs=YtoX(maxIVs);

	var HPType=$('#HPType')[0].selectedIndex-1;
	var Characteristic=$('#Characteristic')[0].selectedIndex-1;
	var CHRType = Characteristic%6;
	var CHRRank = Math.floor(Characteristic/6);
	var SumIVs = $('#SumIVs')[0].selectedIndex;
	var MaxResults=$('#MaxResults').val();
	var HighestIV=$('#HighestIV')[0].selectedIndex;
	if (HighestIV==0) CheckMax=false;
	
	var xHPT;
	table='<table style=text-align:center align=center><tr><th>HP</th><th>攻击</th><th>防御</th><th>特攻</th><th>特防</th><th>速度</th><th>总和</th><th>觉醒力量属性</th><th>觉醒力量威力</th></tr>';
	
	var x=minIVs.slice(0);
	var c=0;
	var i=0;
	w:while(true){
		x[0]++;
		for(i=0;i<=5;i++)
		{
			if(x[i]>maxIVs[i])
			{
				if (i==5) break w;
				x[i]=minIVs[i];
				x[i+1]++;
			}
		}
		xHPT=CalcHPType(x);
		if (HPType>-1&&xHPT!=HPType) continue;
		if (Characteristic>-1&&!CheckCHR(x,CHRType,CHRRank)) continue;
		var m=Math.max.apply({},x);
		var s=eval(x.join("+"));
		
		switch (SumIVs) {
			case 0:
				break;
			case 1:
				if(s<=150) continue;
				break;
			case 2:
				if(s<=120||s>150) continue;
				break;
			case 3:
				if(s<=90||s>120) continue;
				break;
			case 4:
				if(s>90) continue;
				break;
		}
		
		if (CheckMax) {
			for (var j=0;j<=5;j++) {
				if(isMax[j]){
					if (x[j]!=m) continue w;
					switch (HighestIV) {
						case 1:
							if(x[j]!=31) continue w;
							break;
						case 2:
							if(x[j]<25||x[j]==31) continue w;
							break;
						case 3:
							if(x[j]<15||x[j]>=25) continue w;
							break;
						case 4:
							if(x[j]>=15) continue w;
							break;
					}
				//}else{
				//	if (x[j]>=m) continue w;
				}
			}
		}
		
		table+='<tr>';
		table+='<td>'+x[0]+'</td><td>'+x[1]+'</td><td>'+x[2]+'</td><td>'+x[4]+'</td><td>'+x[5]+'</td><td>'+x[3]+'</td>';
		table+='<td>'+s+'</td><td>'+pw.database.types.names['zh-cn'][xHPT]+'</td><td>'+CalcHPPower(x)+'</td>';
		table+='</tr>';
		
		c++;
		if (c==MaxResults) break w;
	}
	table+='</table>';
	$('#details').html(table);
	//$('td.details').css('height','400px');
	minIVs=XtoY(minIVs);
	maxIVs=XtoY(maxIVs);
}

function CalcIV(IV,LV,BS,EV,Stat,Nature) {
	if ((!digit.test(LV))||(!digit.test(Stat))||(!digit.test(BS))||(!digit.test(EV))) {
		minIVs[IV]=-1;
		maxIVs[IV]=-1;
		return;
	}

	LV=parseInt(LV);
	BS=parseInt(BS);
	EV=parseInt(EV);
	Stat=parseInt(Stat);
			
	if ((LV == 0)||(BS == 0)||(Stat==0)) {
		minIVs[IV]=-1;
		maxIVs[IV]=-1;
		return;
	}
	if (BS==1) {
		minIVs[IV]=0;
		maxIVs[IV]=31;
		return;
	}

	var midIV = BackCalc(LV,BS,EV,Stat,Nature);
	var minIV=(midIV<0)?0:midIV;
	var maxIV=(midIV>31)?31:midIV;
	
	for (i=midIV+1;i<=31;i++) {
		if (CalcStat(LV,BS,EV,i,Nature)==Stat) {maxIV++;}else{i=31;}
	}
	for (i=midIV-1;i>=0;i--) {
		if (CalcStat(LV,BS,EV,i,Nature)==Stat) {minIV--;}else{i=0;}
	}

	if (minIV>31||maxIV<0||minIV<0||maxIV>31) {
		minIVs[IV]=-1;
		maxIVs[IV]=-1;
		return;
	}

	minIVs[IV]=minIV;
	maxIVs[IV]=maxIV;
}

function BackCalc(LV,BS,EV,Stat,Nature) {
	if ( Nature == 0 || Nature == undefined ) {
		return Math.ceil((Stat-LV-10)*100/LV-BS*2-Math.floor(EV/4));
	} else {
		return Math.ceil((Math.ceil(Stat/Nature)-5)*100/LV-BS*2-Math.floor(EV/4));
	}
}

function CalcStat(LV,BS,EV,IV,Nature) {
	if (LV == 0) return 0;
	if (BS == 0) return 0;
	if (BS == 1) return 1;
	
	LV=parseInt(LV);
	BS=parseInt(BS);
	EV=parseInt(EV);

	var s;
	
	if ( Nature == 0 || Nature == undefined ) {
		s = Math.floor((BS*2+IV+Math.floor(EV/4))*LV/100+10+LV);
	} else {
		s = Math.floor((BS*2+IV+Math.floor(EV/4))*LV/100+5);
		s = Math.floor(s*Nature);
	}
	
	return s;
}

window.calcStats = function() {
	if ( $('#stats').length == 0 ) {
		var table='';
		table+='<table class="colortable colortable-colborder-single colortable-rowborder-single pokemoncolor" id="stats" style="text-align:center;width:560px">';
		table+='<thead>';
		table+='<tr><th style="width:200px">个体值</th><th style="width:50px">HP</th><th>攻击</th><th>防御</th><th>特攻</th><th>特防</th><th style="width:50px">速度</th></tr>';
		table+='</thead>';
		table+='<tbody></tbody>';
		table+='</table>';
		$('div#Calculator').append(table);
		$("#stats").attr('class',$("#calc").attr('class'));
		$("#stats").addClass('colortable-colborder-single colortable-rowborder-single');
	} else {
		$('#stats tbody').empty();
	}
	var level = $('input#LV').val();
	var html = '';
	var stats = new Array();
	var rowspans = new Array();
	for ( S=0;S<=5;S++ ) {
		stats[S] = new Array();
		rowspans[S] = new Array();
		for ( i=31; i>=0; i-- ) {
			rowspans[S][i] = 1;
		}
	}
	for ( i=31; i>=0; i-- ) {
		for ( S=0;S<=5;S++ ) {
			var N = 1;
			if (S>0) {
				if (!(N1[S-1].checked&&N2[S-1].checked)) {
					if (N1[S-1].checked) N=1.1;
					if (N2[S-1].checked) N=0.9;
				}
			} else {
				N = 0;
			}
			stats[S][i]=CalcStat(level,$('input.BS')[S].value,$('input.EV')[S].value,i,N);
		}
	}
	for ( i=0; i<31; i++ ) {
		for ( S=0;S<=5;S++ ) {
			if ( stats[S][i] == stats[S][i+1] ) {
				rowspans[S][i+1]+=rowspans[S][i];
				rowspans[S][i]=0;
			}
		}
	}
	for ( i=31; i>=0; i-- ) {
		html += '<tr>';
		html += '<td>' + i + '</td>';
		for ( S=0;S<=5;S++ ) {
			if ( rowspans[S][i]>0 ) {
				html += '<td rowspan="' + rowspans[S][i] + '">' + stats[S][i] + '</td>';
			}
		}
		html += '</tr>';
	}
	$('#stats tbody').html(html);
	$('#stats td').css('border-right','none');
};
//////////////////
function YtoX(y) {
	return [y[0],y[1],y[2],y[5],y[3],y[4]];
}
function XtoY(x) {
	return [x[0],x[1],x[2],x[4],x[5],x[3]];
}

function CalcHPType(x) {
	var h=0;
	for (var j=0;j<=5;j++) {
		if(x[j]%2==1) h+=HP_Value[j];
	}
	return Math.floor(h*15/63)+1;
}
		
function CalcHPPower(x) {
	var p=0;
	for (var j=0;j<=5;j++) {
		if(x[j]%4>=2) p+=HP_Value[j];
	}
	return Math.floor(p*40/63)+30;
}

function CheckCHR(x,CHRType,CHRRank) {
	var m=Math.max.apply({},x);
	return (x[CHRType]==m&&m%5==CHRRank);
}

//////////////////////////

window.CreateURL = function() {
	var url = 'http://www.pokemon.name/w/index.php?title=' + mw.config.get('wgPageName');
	if ($("#pokemon")[0].selectedIndex > 0) url += '&pid=' + $("#pokemon")[0].selectedIndex;
	if ($LV.val()!=1) url += '&plv=' + $LV.val();
	var Stats='';
	for ( var i = 0; i <= 5; i++) { Stats += ',' + $Stats[i].value;}
	if ( Stats != ',,,,,,' ) url += '&ps=' + Stats.substring(1);
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
	if ( $('#HPType')[0].selectedIndex>0 ) url += '&ph=' + $('#HPType')[0].selectedIndex;
	if ( $('#Characteristic')[0].selectedIndex>0 ) url += '&pc=' + $('#Characteristic')[0].selectedIndex;
	if ( $('#SumIVs')[0].selectedIndex>0 ) url += '&psiv=' + $('#SumIVs')[0].selectedIndex;
	if ( $('#HighestIV')[0].selectedIndex>0 ) url += '&phiv=' + $('#HighestIV')[0].selectedIndex;
	var $hiv = $('.Highest');
	var hiv='';
	for ( var i = 0; i <= 5; i++) { hiv += ($hiv[i].checked)?'1':'0' }
	if ( hiv != '000000' ) url += '&phiv2=' + hiv;
	$('#URL').val(url);
}

if ( window.location.href.indexOf('/w/') > 1 ) {
	var plv = mw.util.getParamValue('plv');
	if ( plv != null ) { $LV.val( plv ); }

	var ps = mw.util.getParamValue('ps');
	if ( ps != null ) {
		var ps2 = ps.split(',');
		for ( var j = 0; j <= 5; j++) {
			$Stats[j].value = ps2[j];
		}
	}

	var pev = mw.util.getParamValue('pev');
	if ( pev != null ) {
		var pev2 = pev.split(',');
		for ( var j = 0; j <= 5; j++) {
			$EVs[j].value = pev2[j];
		}
	}

	var pn = mw.util.getParamValue('pn');
	if ( pn != null ) {
		var pn2 = pn.split(',');
		if (pn[0]>0) N1[pn2[0]-1].checked = true;
		if (pn[1]>0) N2[pn2[1]-1].checked = true;
	}

	var ph = mw.util.getParamValue('ph');
	if ( ph != null ) { $("#HPType")[0].selectedIndex = ph; }

	var pc = mw.util.getParamValue('pc');
	if ( pc != null ) { $("#Characteristic")[0].selectedIndex = pc; }

	var psiv = mw.util.getParamValue('psiv');
	if ( psiv != null ) { $("#SumIVs")[0].selectedIndex = psiv; }

	var phiv = mw.util.getParamValue('phiv');
	if ( phiv != null ) { $("#HighestIV")[0].selectedIndex = phiv; }

	var phiv2 = mw.util.getParamValue('phiv2');
	if ( phiv2 != null ) { 
		for ( var j = 0; j <= 5; j++) {
			$('.Highest')[j].checked=(phiv2[j]==1);
		}
	 }

	var pid = mw.util.getParamValue('pid');
	if ( pid != null ) {
		$("#pokemon")[0].selectedIndex = pid;
		SelectPokemon(pid);
	}
}

});