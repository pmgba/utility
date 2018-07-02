pquestCalc =  {
	basestats : [ [],
[125,75],
[400,100],
[550,150],
[75,125],
[100,400],
[200,600],
[100,100],
[250,250],
[400,400],
[110,90],
[275,25],
[150,250],
[100,100],
[250,50],
[150,250],
[100,100],
[250,250],
[400,400],
[75,125],
[150,450],
[75,125],
[100,500],
[80,120],
[150,450],
[70,130],
[150,450],
[80,120],
[150,350],
[140,60],
[325,175],
[600,200],
[60,140],
[175,325],
[200,600],
[120,80],
[450,250],
[110,90],
[550,250],
[140,60],
[450,150],
[80,120],
[200,400],
[75,125],
[250,350],
[300,500],
[80,120],
[200,500],
[120,80],
[350,350],
[60,140],
[100,600],
[85,115],
[300,400],
[80,120],
[200,500],
[60,140],
[150,550],
[80,120],
[350,450],
[90,110],
[350,350],
[350,450],
[45,155],
[90,410],
[100,700],
[80,120],
[200,500],
[250,550],
[80,120],
[250,350],
[300,500],
[90,110],
[550,150],
[140,60],
[610,90],
[700,100],
[100,100],
[400,400],
[130,70],
[650,150],
[80,120],
[300,400],
[350,350],
[80,120],
[200,500],
[110,90],
[500,300],
[110,90],
[650,150],
[120,80],
[575,225],
[50,150],
[125,575],
[150,650],
[600,100],
[120,80],
[500,200],
[70,130],
[100,600],
[110,90],
[400,300],
[130,70],
[250,550],
[130,70],
[525,175],
[50,650],
[75,625],
[600,100],
[140,60],
[450,350],
[120,80],
[300,500],
[675,25],
[400,300],
[350,350],
[90,110],
[250,450],
[70,130],
[350,450],
[60,140],
[150,650],
[575,125],
[100,700],
[150,550],
[300,400],
[175,525],
[75,725],
[100,600],
[25,25],
[200,400],
[650,150],
[350,350],
[100,100],
[600,200],
[250,550],
[200,600],
[350,350],
[140,60],
[575,225],
[70,130],
[150,650],
[125,675],
[650,150],
[600,400],
[350,650],
[500,500],
[80,120],
[300,400],
[400,500],
[550,750],
[650,650],
],

	init : function() {
		pquestCalc.createContent();
	},
	
	
	createContent : function() {
	var html = ''
		+'<div class="card border-primary ablock-half">'
		+'<div class="card-header border-primary bg-primary">'
		+'<div class="nav nav-tabs card-header-tabs">'
    +'	<a class="nav-item nav-link calc__searchnav active" data-toggle="tab" href="#calc-searchtab">个体值计算器</a>'
    +'</div>'
    +'</div>'
		+'<div class="card-body">'
		+'<div class="container-fluid">'
		+'<div class="tab-content">'

		+'	<div class="tab-pane fade show active" id="calc-searchtab"><div class="row">'
		
+'		<div class="col-12 col-lg-6">'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">宝可梦</label>'
+'				<div class="col-8"><select class="form-control calc__pokemon" name="calc-type">'
+'					<option value="-1">-</option>'
+function(){
	var h = '';
	for ( var i=1; i<=151; i++ ) {
		h += '<option value="'+i+'">'+String('00').concat(i).slice(-3) + ' ' + pw.util.getPokemonName(i)+'</option>';
	}
	return h;
}()
+'				</select></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">等级</label>'
+'				<div class="col-8"><input type="text" class="form-control calc__level" value="0" ></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">HP</label>'
+'				<div class="col-8"><input type="text" class="form-control calc__hp" value="0" ></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">Atk</label>'
+'				<div class="col-8"><input type="text" class="form-control calc__atk" value="0" ></div>'
+'			</div>'
+'<hr />'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label"></label>'
+'				<div class="col-8"><button type="button" class="btn btn-primary m-1 calc__ok">计算</button></div>'
+'			</div>'
+'		</div>'
+'		<div class="col-12 col-lg-6 calc__resultcontainer" style="overflow-y: auto;max-height: 500px;">'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">HP个体值</label>'
+'				<div class="col-8"><input type="text" class="form-control calc__hpresult" value="0" ></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">Atk个体值</label>'
+'				<div class="col-8"><input type="text" class="form-control calc__atkresult" value="0" ></div>'
+'			</div>'
+'		</div>'
+'</div></div>'
+'		</div>'
+'		</div>'
+'		</div>'
;
	$('.pw-jscontent').html(html);
	
	$('.calc__ok').click(pquestCalc.OK);
	},
	
	OK : function() {
		var pi = parseInt($('.calc__pokemon').val(),10);
		var lv = parseInt($('.calc__level').val(),10);
		var hp = parseInt($('.calc__hp').val(),10);
		var atk = parseInt($('.calc__atk').val(),10);
		
		var bsHp = pquestCalc.basestats[pi][0];
		var bsAtk = pquestCalc.basestats[pi][1];
		
		var ivHp = hp - bsHp - lv - 1;
		var ivAtk = atk - bsAtk - lv - 1;
		
		$('.calc__hpresult').val(ivHp);
		$('.calc__atkresult').val(ivAtk);
	},
	
};

pw.loader.using( [ 'pokemon.js', 'bootstrap' ], function() {
	pquestCalc.init();
});