// [[分类:脚本文件]]
// 这个文件由[[Iv calculator]]调用。

pw.loader.using( [ 'pokemon.js', 'pokemon.7.js', 'bootstrap' ], function(){

mw.util.addCSS(''
+'.pw-jscontent, .pw-jscontent input.form-control { text-align:center;}'
+'.calc-nt1,.calc-nt2 {display:none;}.calc-nt1+label,.calc-nt2+label{font-weight:bold;color:#ccc;border:1px solid #ccc;border-radius:24px;font-size:20px;line-height:100%;padding:3px;margin:0;font-family: monospace;vertical-align: middle;}.calc-nt1:checked+label{background:#f88;color:white;border-color:#f88;}.calc-nt2:checked+label{ background:#88f;color:white;border-color:#88f;}'
);

var n_n=['勤奋','怕寂寞','勇敢','固执','顽皮','大胆','坦率','悠闲','淘气','乐天','胆小','急躁','认真','爽朗','天真','内敛','慢吞吞','冷静','害羞','马虎','温和','温顺','自大','慎重','浮躁'];
var n_v = ["0/0","0/0","0/1","0/2","0/3","0/4","0/0","1/0","1/1","1/2","1/3","1/4","0/0","2/0","2/1","2/2","2/3","2/4","0/0","3/0","3/1","3/2","3/3","3/4","0/0","4/0","4/1","4/2","4/3","4/4"];
var p_n=['非常喜欢吃东西','经常睡午觉','常常打瞌睡','经常乱扔东西','喜欢悠然自在','以力气大为傲','喜欢胡闹','有点容易生气','喜欢打架','血气方刚','身体强壮','抗打能力强','顽强不屈','能吃苦耐劳','善于忍耐','喜欢比谁跑得快','对声音敏感','冒冒失失','有点容易得意忘形','逃得快','好奇心强','喜欢恶作剧','做事万无一失','经常思考','一丝不苟','性格强势','有一点点爱慕虚荣','争强好胜','不服输','有一点点固执'];

function rearrangeBaseStats ( x ) {
	return [x[0],x[1],x[2],x[4],x[5],x[3]];
}


////////////////////

	var html = ''
+'<div class="card border-primary shuffledex">'
+'<div class="card-header border-primary bg-primary">'
+'<div class="nav nav-tabs card-header-tabs">'
+'	<a class="nav-item nav-link calc-tab active" data-toggle="tab" href="#calc-tab">个体值计算器</a>'
+'</div>'
+'</div>'
+'<div class="card-body">'
+'<div class="container-fluid">'
+'<div class="tab-content">'
+'<div class="tab-pane fade show active" id="calc-tab"><div class="row">'
+'		<div class="col-12 col-lg-3">'
+'		<div class="form-group"><label>宝可梦</label></div>'
+'		<div class="form-group row"><div class="col-12 calc-sprite"></div></div>'
+'		<div class="form-group row">'
+'		<div class="col-8"><select class="form-control calc-selectPokemon" /></div>'
+'		<div class="col-4"><select class="form-control calc-selectForm" /></div>'
+'		</div>'
+'		</div>'
+'		<div class="col-12 col-lg-9">'
+'		<div class="form-group row"><label class="col-1">能力</label><label class="col-2">种族值</label><label class="col-2">努力值</label><label class="col-2">性格</label><label class="col-2">能力值</label><label class="col-3">个体值</label></div>'
+(function(){
	var x='';
	for (i=0;i<=5;i++) {
	x+='<div class="form-group row">'
+'<label class="col-1">'+['HP','攻击','防御','特攻','特防','速度'][i]+'</label>'
+'<div class="col-2"><input type="text" class="form-control calc-bs" value="0" maxlength="3"></div>'
+'<div class="col-2"><input type="text" class="form-control calc-ev" value="0" maxlength="3"></div>'
+'<div class="col-2">' + ((i==0)?'':'<input type="radio" class="form-check-input calc-nt1 " name="nature1" id="n1'+(i-1)+'" value="'+(i-1)+'"><label for="n1'+(i-1)+'">＋</label>　<input type="radio" class="form-check-input calc-nt2" id="n2'+(i-1)+'" name="nature2" value="'+(i-1)+'"><label for="n2'+(i-1)+'">－</label>') + '</div>'
+'<div class="col-2"><input type="text" class="form-control calc-stat" value="0" maxlength="3"></div>'
+'<div class="col-3"><input type="text" class="form-control calc-iv" value="0" maxlength="3"></div>'
+'</div>';
	}
	return x;
})()
+'<div class="form-group row"><label class="col-1">等级</label><div class="col-2"><input type="text" class="form-control calc-level" value="1" maxlength="3"></div>'
+'<div class="col-2"><select class="form-control calc-selectEV">'
+'<option value="0/0/0/0/0/0" selected>全0</option>'
+'<option value="252/0/0/0/0/252">HP速度252</option>'
+'<option value="0/252/0/0/0/252">攻击速度252</option>'
+'<option value="0/0/0/252/0/252">特攻速度252</option>'
+'<option value="252/0/252/0/0/0">HP防御252</option>'
+'<option value="252/0/0/0/252/0">HP特防252</option>'
+'<option value="0/0/252/0/252/0">防御特防252</option>'
+'<option value="252/252/252/252/252/252">全满</option>'
+'</select></div>'
+'<div class="col-2"><select class="form-control calc-selectNature">'
+(function(){
	var x='';
	for (i=0;i<n_n.length;i++) {
	x+='<option value="'+n_v[i]+'">'+n_n[i]+'</option>';
	}
	return x;
})()
+'</select></div>';
+'		</div>'
+'</div></div></div></div></div></div>'
;
/*
var table='';
table+='<td>等级</td><td class="input"><input type="text" id="LV" value="1" maxlength="3" onkeyup="CalcAll();"></td>';
table+='<td class="select"><select onChange="SelectNature(value)">';
for (var i=0;i<n_v.length;i++) { table+=; }
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
table+='</table></div></div>';
*/
$(".pw-jscontent").html(html);
$("tr.advance").hide();


////////////////////
//var CharacteristicIVs=[[0,5,10,15,20,25,30],[1,6,11,16,21,26,31],[2,7,12,17,22,27],[3,8,13,18,23,28],[4,9,14,19,24,29]];

var Working = false;
var $BSs = $('.calc-bs');
var $EVs = $('.calc-ev');
var $IVs = $('.calc-iv');
var $Stats = $('.calc-stat');
var $LV = $('.calc-level');
var N1 = $('.calc-nt1');
var N2 = $('.calc-nt2');
var minIVs=[-1,-1,-1,-1,-1,-1];
var maxIVs=[-1,-1,-1,-1,-1,-1];
var HP_Value = [1,2,4,8,16,32];
var hasResults = false;
var isUniqueResult = false;
var digit=/^\d+$/;

var formcounts = {};
$.each(pw.database.pokemon.data[7],function(k,v){
	var x = k.split('.');
	formcounts[x[0]] = 1 + (formcounts[x[0]] || 0);
});

SelectGen = function( num ) {
	var num_begin = 1, num_end = 807;
	var options = '<option value="0" selected></option>';
	for (i=num_begin;i<=num_end;i++) {
		options += '<option value="'+i+'" >'+ String('00').concat(i).slice(-3) +' '+pw.util.getPokemonName(i)+'</option>';
	}
	$('.calc-selectPokemon').empty().html(options);
	SelectPokemon(1);
}

SelectPokemon = function(num) {
	$('.calc-selectForm').empty();
	if ( num == 0 ) {
		$('.calc-sprite').html('&nbsp;');
	}else{
		var p = String('00').concat(num).slice(-3);
		var options = '';
		for (i=0;i<formcounts[p];i++) {
			var key = p + '.' + String('00').concat(i).slice(-2);
			var name = pw.util.getPokemonName(key);
			options += '<option value='+key+' >'+ ( name.form || name.name ) +'</option>';
		}
		$('.calc-selectForm').html(options);
		SelectForm(p.concat('.00'));
		//var color = pw.database.pokemon.colors[num];
		//$("#calc").attr('class','colortable pokemoncolor pokemoncolor-'+COLORNAMES[color]);
		//$("#stats").attr('class','colortable colortable-colborder-single colortable-rowborder-single pokemoncolor pokemoncolor-'+COLORNAMES[color]);
	}
}

SelectForm = function(key) {
	var num = parseInt(key.split('.')[0]);
	$('.calc-sprite').html('<a href="/wiki/' + pw.util.getPokemonName(num)+ '" title="' + pw.util.getPokemonName(num) + '">' + pw.util.createPokemonImage('pgl',key,'width:80%;') + '</a>');
	var bs = rearrangeBaseStats(pw.database.pokemon.data[7][key].basestats);
	for ( i=0;i<=5;i++ ) {
		$BSs[i].value=bs[i];
	}
	//CalcAll();
}


SelectEVs = function(value) {
	var EVs=value.split("/");
	for ( i=0;i<=5;i++ ) {
		$EVs[i].value=EVs[i];
	}
	CalcAll();
}

SelectNature = function(value) {
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


CalcAll = function() {
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
			$IVs[i].value = "?";
		} else if (minIVs[i]==maxIVs[i]){
			$IVs[i].value = minIVs[i];
			/*
			if ( ($Stats[i].value != CalcStat($LV.val(),$BSs[i].value,$EVs[i].value,minIVs[i],N[j])) ) {
				$('#HP').html( "&nbsp;" );
				$('#IV_SUM').html("&nbsp;" );
				$IVs[i].value = "?";
				isUniqueResult=false;
				hasResults=false;
			} else {
				$IVs[i].value = minIVs[i];
			}
			*/
		} else {
			isUniqueResult=false;
			$IVs[i].value = minIVs[i] + "～" + maxIVs[i];
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
/*
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
*/
CalcDetails = function() {
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

calcStats = function() {
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

CreateURL = function() {
	return '';
	var url = 'http://www.pokemon.name/w/index.php?title=' + mw.config.get('wgPageName');
	if ($(".calc-selectPokemon")[0].selectedIndex > 0) url += '&pid=' + $(".calc-selectPokemon")[0].selectedIndex;
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
	//if ( $('#HPType')[0].selectedIndex>0 ) url += '&ph=' + $('#HPType')[0].selectedIndex;
	//if ( $('#Characteristic')[0].selectedIndex>0 ) url += '&pc=' + $('#Characteristic')[0].selectedIndex;
	//if ( $('#SumIVs')[0].selectedIndex>0 ) url += '&psiv=' + $('#SumIVs')[0].selectedIndex;
	//if ( $('#HighestIV')[0].selectedIndex>0 ) url += '&phiv=' + $('#HighestIV')[0].selectedIndex;
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

SelectGen(0);
$('.calc-selectPokemon').change(function(){SelectPokemon(this.value);});
$('.calc-selectForm').change(function(){SelectForm(this.value);});
$('.pw-jscontent input').change(CalcAll);
});