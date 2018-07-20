// [[分类:脚本文件]]
// 这个文件由[[Iv calculator]]调用。

pw.loader.using( [ 'pokemon.js', 'pokemon.7.js', 'bootstrap' ], function(){

mw.util.addCSS(''
+'.pw-jscontent, .pw-jscontent input.form-control { text-align:center;}'
+'.calc-nt1,.calc-nt2 {display:none;}.calc-nt1+label,.calc-nt2+label{font-weight:bold;color:#ccc;border:1px solid #ccc;border-radius:24px;font-size:20px;line-height:100%;padding:3px;margin:0;font-family: monospace;vertical-align: middle;}.calc-nt1:checked+label{background:#f88;color:white;border-color:#f88;}.calc-nt2:checked+label{ background:#88f;color:white;border-color:#88f;}'
);

var n_n=['-','勤奋','怕寂寞','勇敢','固执','顽皮','大胆','坦率','悠闲','淘气','乐天','胆小','急躁','认真','爽朗','天真','内敛','慢吞吞','冷静','害羞','马虎','温和','温顺','自大','慎重','浮躁'];
var n_v = ['0/0','0/0','0/1','0/4','0/2','0/3','1/0','0/0','1/4','1/2','1/3','4/0','4/1','0/0','4/2','4/3','2/0','2/1','2/4','0/0','2/3','3/0','3/1','3/4','3/2','0/0'];

function rearrangeBaseStats ( x ) {
	return [x[0],x[1],x[2],x[4],x[5],x[3]];
}


////////////////////

	var html = ''
+'<div class="card border-primary shuffledex">'
+'<div class="card-header border-primary bg-primary">'
+'<div class="nav nav-tabs card-header-tabs">'
+'	<a class="nav-item nav-link calc-tab active" data-toggle="tab" href="#calc-tab">能力值计算器</a>'
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
+'		<div class="form-group row"><label class="col-1">能力</label><label class="col-2">种族值</label><label class="col-2">个体值</label><label class="col-2">努力值</label><label class="col-2">性格</label><label class="col-3">能力值</label></div>'
+(function(){
	var x='';
	for (i=0;i<=5;i++) {
	x+='<div class="form-group row">'
+'<label class="col-1">'+['HP','攻击','防御','特攻','特防','速度'][i]+'</label>'
+'<div class="col-2"><input type="text" class="form-control calc-bs" value="0" maxlength="3"></div>'
+'<div class="col-2"><input type="text" class="form-control calc-iv" value="31" maxlength="3"></div>'
+'<div class="col-2"><input type="text" class="form-control calc-ev" value="0" maxlength="3"></div>'
+'<div class="col-2">' + ((i==0)?'':'<input type="radio" class="form-check-input calc-nt1 " name="nature1" id="n1'+(i-1)+'" value="'+(i-1)+'"><label for="n1'+(i-1)+'">＋</label>　<input type="radio" class="form-check-input calc-nt2" id="n2'+(i-1)+'" name="nature2" value="'+(i-1)+'"><label for="n2'+(i-1)+'">－</label>') + '</div>'
+'<div class="col-3"><input type="text" class="form-control calc-stat" value="0" maxlength="3"></div>'
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
$(".pw-jscontent").html(html);
$("tr.advance").hide();

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
	}
}

SelectForm = function(key) {
	var num = parseInt(key.split('.')[0]);
	$('.calc-sprite').html('<a href="/wiki/' + pw.util.getPokemonName(num)+ '" title="' + pw.util.getPokemonName(num) + '">' + pw.util.createPokemonImage('pgl',key,'width:80%;') + '</a>');
	var bs = rearrangeBaseStats(pw.database.pokemon.data[7][key].basestats);
	for ( i=0;i<=5;i++ ) {
		$BSs[i].value=bs[i];
	}
	CalcAll();
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


function CalcAll() {
	var N = [0,1,1,1,1,1];
	for (i=0;i<=4;i++){
		if (N1[i].checked&&N2[i].checked) break;
		if (N1[i].checked) N[i+1]=1.1;
		if (N2[i].checked) N[i+1]=0.9;
	}
	for (S=0;S<=5;S++) {
		$Stats[S].value = (CalcStat($LV.val(), $BSs[S].value, $EVs[S].value, $IVs[S].value, (S==0)?0:N[S-1] ) );
	}
	
	CreateURL();
}

function CalcStat(LV,BS,EV,IV,Nature) {
	if (LV == 0) return 0;
	if (BS == 0) return 0;
	if (BS == 1) return 1;
	
	LV=parseInt(LV,10);
	BS=parseInt(BS,10);
	EV=parseInt(EV,10);
	IV=parseInt(IV,10);

	var s;
	
	if ( Nature == 0 || Nature == undefined ) {
		s = Math.floor((BS*2+IV+Math.floor(EV/4))*LV/100+10+LV);
	} else {
		s = Math.floor((BS*2+IV+Math.floor(EV/4))*LV/100+5);
		s = Math.floor(s*Nature);
	}
	
	return s;
}


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
$('.calc-selectNature').change(function(){SelectNature(this.value);});
$('.calc-selectEV').change(function(){SelectEVs(this.value);});
$('.pw-jscontent input').change(CalcAll);

});