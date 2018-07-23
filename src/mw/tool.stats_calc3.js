// [[分类:脚本文件]]
// 这个文件由[[Iv calculator]]调用。

pw.loader.using( [ 'pokemon.js', 'pokemon.7.js', 'bootstrap' ], function(){

mw.util.addCSS(''
+'.pw-jscontent, .pw-jscontent input.form-control { text-align:center;}'
+'.calc-nt1,.calc-nt2 {display:none;}.calc-nt1+label,.calc-nt2+label{font-weight:bold;color:#ccc;border:1px solid #ccc;border-radius:24px;font-size:20px;line-height:100%;padding:3px;margin:0;font-family: monospace;vertical-align: middle;}.calc-nt1:checked+label{background:#f88;color:white;border-color:#f88;}.calc-nt2:checked+label{ background:#88f;color:white;border-color:#88f;}'
);

var natureNames=['-','勤奋','怕寂寞','勇敢','固执','顽皮','大胆','坦率','悠闲','淘气','乐天','胆小','急躁','认真','爽朗','天真','内敛','慢吞吞','冷静','害羞','马虎','温和','温顺','自大','慎重','浮躁'];

////////////////////

var formcounts = {};
$.each(pw.database.pokemon.data[7],function(k,v){
	var x = k.split('.');
	formcounts[x[0]] = 1 + (formcounts[x[0]] || 0);
});

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
+'<option value="252/0/0/252/0/0">HP速度252</option>'
+'<option value="0/252/0/0/252/0">攻击速度252</option>'
+'<option value="0/0/0/252/252/0">特攻速度252</option>'
+'<option value="252/0/252/0/0/0">HP防御252</option>'
+'<option value="252/0/0/0/0/252">HP特防252</option>'
+'<option value="0/0/252/0/0/252">防御特防252</option>'
+'<option value="252/252/252/252/252/252">全满</option>'
+'</select></div>'
+'<div class="col-2"><select class="form-control calc-selectNature">'
+(function(){
	var x='';
	for (i=0;i<natureNames.length;i++) {
	x+='<option value="'+(i-1)+'">'+natureNames[i]+'</option>';
	}
	return x;
})()
+'</select></div>';
+'		</div>'
+'</div></div></div></div></div></div>'
;
$(".pw-jscontent").html(html);

var num_begin = 1, num_end = 807;
var options = '<option value="0" selected></option>';
for (i=num_begin;i<=num_end;i++) {
	options += '<option value="'+i+'" >'+ String('00').concat(i).slice(-3) +' '+pw.util.getPokemonName(i)+'</option>';
}
$('.calc-selectPokemon').empty().html(options);

var pid = mw.util.getParamValue('pid');
if ( pid != null ) {
	var x = pid.split('.');
	selectPokemon( x[0], x[1]);
	$('.calc-selectPokemon').val( x[0] );
	$('.calc-selectForm').val( pid );
} else {
	$('.calc-selectPokemon').val( '001.00' );
	selectPokemon(1);
}

$('.calc-selectPokemon').change(function(){selectPokemon(this.value);});
$('.calc-selectForm').change(function(){selectForm(this.value);});
$('.calc-selectNature').change(function(){selectNature(this.value);});
$('.calc-selectEV').change(function(){selectEVs(this.value);});
$('.pw-jscontent input').change(calcAll);




/************/

function getValues( selector ) {
	var $e = $(selector);
	return [
		parseInt($e[0].value,10),
		parseInt($e[1].value,10),
		parseInt($e[2].value,10),
		parseInt($e[5].value,10),
		parseInt($e[3].value,10),
		parseInt($e[4].value,10),
	];
}

function setValues( selector, values ) {
	var $e = $(selector);
	$e[0].value = values[0];
	$e[1].value = values[1];
	$e[2].value = values[2];
	$e[3].value = values[4];
	$e[4].value = values[5];
	$e[5].value = values[3];
}

function getNatures( ) {
	var nt1 = $('.calc-nt1:checked').val()*1+1;
	var nt2 = $('.calc-nt2:checked').val()*1+1;
	var n = [0,1,1,1,1,1];
	if ( nt1 != nt2 ) {
		n[nt1] = 1.1;
		n[nt2] = 0.9;
	}
	return [ n[0], n[1], n[2], n[5], n[3], n[4] ];
}
function calcAll() {
	var level = parseInt($('.calc-level').val(),10);
	var bs = getValues('.calc-bs');
	var ev = getValues('.calc-ev');
	var iv = getValues('.calc-iv');
	var nt = getNatures();
	
	
	var stats = [];
	for (i=0;i<=5;i++) {
		stats[i] = calcStat(level, bs[i], ev[i], iv[i], nt[i] );
	}
	setValues( '.calc-stat', stats );
}

function calcStat(lv,bs,ev,iv,nt) {
	if (lv == 0) return 0;
	if (bs == 0) return 0;
	if (bs == 1) return 1;
	var s=0;
	if ( nt == 0 ) { //HP
		s = Math.floor((bs*2+iv+Math.floor(ev/4))*lv/100+10+lv);
	} else { //AT..SP
		s = Math.floor((bs*2+iv+Math.floor(ev/4))*lv/100+5);
		s = Math.floor(s*nt);
	}
	return s;
}

function selectPokemon( num, form ) {
	$('.calc-selectForm').empty();
	if ( num == 0 ) {
		$('.calc-sprite').html('&nbsp;');
	}else{
		var p = String('00').concat(num).slice(-3);
		var f = String('00').concat(form || 0).slice(-2);
		var pid = p + '.' + f;
		var options = '';
		for (i=0;i<formcounts[p];i++) {
			var key = p + '.' + String('00').concat(i).slice(-2);
			var name = pw.util.getPokemonName(key);
			options += '<option value='+key+' >'+ ( name.form || name.name ) +'</option>';
		}
		$('.calc-selectForm').html(options);
		
		selectForm( pid );
	}
}

function selectForm(key) {
	var num = parseInt(key.split('.')[0]);
	$('.calc-sprite').html('<a href="/wiki/' + pw.util.getPokemonName(num)+ '" title="' + pw.util.getPokemonName(num) + '">' + pw.util.createPokemonImage('pgl',key,'width:80%;') + '</a>');
	setValues( '.calc-bs', pw.database.pokemon.data[7][key].basestats );
	calcAll();
}

function selectEVs(value) {
	var evs = value.split("/");
	setValues( '.calc-ev', evs );
	calcAll();
}
function selectNature(value) {
	value = parseInt(value);
	var v = [0,1,2,5,3,4];
	if ( value == -1 ) {
		$('.calc-nt1')[0].checked=true;
		$('.calc-nt1')[0].checked=false;
		$('.calc-nt2')[0].checked=true;
		$('.calc-nt2')[0].checked=false;
	} else {
		var nt1 = v[Math.floor(value/5) + 1];
		var nt2 = v[value % 5 + 1];
		$('.calc-nt1')[nt1-1].checked=true;
		$('.calc-nt2')[nt2-1].checked=true;
	}
	calcAll();
}

});