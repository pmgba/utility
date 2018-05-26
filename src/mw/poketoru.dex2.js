poketoruDex =  {
	
	init : function() {
		
		$.extend( true, pw.poketoru, {
			skillOrder : [72,76,159,45,51,52,1,2,46,3,67,71,118,121,120,86,111,4,47,119,115,116,117,112,113,5,48,122,90,114,73,74,75,110,9,40,153,41,144,42,
				143,150,43,152,44,66,92,151,84,37,88,36,38,87,145,156,26,93,39,154,155,20,149,147,146,148,6,10,11,123,89,12,14,13,15,16,81,82,99,100,101,102,105,
				106,107,68,80,103,108,104,50,77,78,109,79,17,131,18,130,49,83,19,128,69,70,129,127,7,126,8,124,85,125,163,21,22,23,30,54,55,132,160,31,56,57,135,
				32,58,59,140,142,141,33,60,61,91,139,138,34,62,63,137,136,161,24,25,133,134,162,27,28,53,29,35,64,65,98,94,157,95,158,96,97],
		
			maxExp : [ [],
				[ 0,50,100,150,150,450,750,900,1050,1200,1350,1050,1500,1800,2100,2250,2400,2550,2700,3000,3150,3300,3450,3600,3750,3900,4050,4200,4350,4500 ],
				[ 0,55,110,165,165,495,825,990,1155,1320,1485,1155,1650,1980,2310,2475,2640,2805,2970,3300,3465,3630,3795,3960,4125,4290,4455,4620,4785,4950 ],
				[ 0,60,120,180,180,540,900,1080,1260,1440,1620,1260,1800,2160,2520,2700,2880,3060,3240,3600,3780,3960,4140,4320,4500,4680,4860,5040,5220,5400 ],
				[ 0,65,130,195,195,585,975,1170,1365,1560,1755,1365,1950,2340,2730,2925,3120,3315,3510,3900,4095,4290,4485,4680,4875,5070,5265,5460,5655,5850 ],
				[ 0,70,140,210,210,630,1050,1260,1470,1680,1890,1470,2100,2520,2940,3150,3360,3570,3780,4200,4410,4620,4830,5040,5250,5460,5670,5880,6090,6300 ],
				[ 0,75,150,225,225,675,1125,1350,1575,1800,2025,1575,2250,2700,3150,3375,3600,3825,4050,4500,4725,4950,5175,5400,5625,5850,6075,6300,6525,6750 ],
				[ 0,80,160,240,240,720,1200,1440,1680,1920,2160,1680,2400,2880,3360,3600,3840,4080,4320,4800,5040,5280,5520,5760,6000,6240,6480,6720,6960,7200 ]
			],
		
			superEffects : [],
			skillPokemonCount : [],
			typePokemonCount : [],
			sePokemonCount : [],
		} );
		
		mw.util.addCSS(''
+			'.shuffledex { min-height: 600px;}'
+			'.shuffle-data .row + .row { border-top: 1px dotted #ddd; }'
+			'.shuffle-data .row { padding:3px; text-align:center;}'
+			'.shuffle-table { font-size:small;width:100%;text-align:center;border: 1px solid #ddd;border-spacing: 0;border-collapse: collapse; table-layout:fixed; margin-bottom:1em; }'
+			'.shuffle-table td { border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; }'
+			'.shuffledex-edit[type=radio] { position: absolute; }'
+			'.shuffledex-edit:not(:checked) { display: none; }'
+			'.shuffledex-editparent:hover .shuffledex-edit { display: inline; }'
			);

		for(var i=0;i<18;i++ ){
			pw.poketoru.superEffects[i]=[];
			pw.poketoru.typePokemonCount[i]=0;
			pw.poketoru.sePokemonCount[i]=0;
			for(var j=0;j<18;j++ ){
				if( pw.poketoru.typeEffects[j][i]==2 ) pw.poketoru.superEffects[i].push(j);
			}
		}
		for ( var t=0; t<=pw.poketoru.skillOrder.length; t++ ) {
			pw.poketoru.skillPokemonCount.push(0);
		}
		
		$.each( pw.poketoru.pokemonData, function(pkmnID,data) {
			var pkmn = pw.poketoru.getPokemonData(pkmnID);
			if ( !pkmn.isMega ) {
				$.each ( pkmn.skills, function(i,s) {
					pw.poketoru.skillPokemonCount[s] += 1;
				});
			}
			pw.poketoru.typePokemonCount[pkmn.type] += 1;
			$.each ( pw.poketoru.superEffects[pkmn.type], function(i,v) {
				pw.poketoru.sePokemonCount[v] += 1;
			});
		});

		poketoruDex.createContent();
		//pw.poketoru.myPokemon = pw.localStorage.get('Poketoru-MyPokemon',{});
	},
	
	
	createContent : function() {
	var html = ''
		+'<div class="card border-primary shuffledex">'
		+'<div class="card-header border-primary bg-primary">'
		+'<div class="nav nav-tabs card-header-tabs">'
    +'	<a class="nav-item nav-link shuffledex__searchnav active" data-toggle="tab" href="#shuffledex-searchtab">搜索</a>'
    +'	<a class="nav-item nav-link shuffledex__pokemonnav" data-toggle="tab" href="#shuffledex-pokemontab">宝可梦</a>'
    +'</div>'
    +'</div>'
		+'<div class="card-body">'
		+'<div class="container-fluid">'
		+'<div class="tab-content">'

		+'	<div class="tab-pane fade show active" id="shuffledex-searchtab"><div class="row">'
		
+'		<div class="col-12 col-lg-3">'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">排序方式</label>'
+'				<div class="col-8"><select class="form-control" name="shuffledex-sort">'
+'					<option value="0">编号</option>'
+'					<option value="1">等级</option>'
+'					<option value="2">满级攻击力</option>'
+'					<option value="3">属性</option>'
+'				</select></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">属性</label>'
+'				<div class="col-8"><select class="form-control" name="shuffledex-type">'
+'					<option value="-1">-</option>'
+function(){
	var h = '';
	for ( var t=0; t<pw.database.types.names['zh-cn'].length; t++ ) {
		h += '<option value="'+t+'">'+pw.database.types.names['zh-cn'][t]+'</option>';
	}
	for ( var t=0; t<pw.database.types.names['zh-cn'].length; t++ ) {
		h += '<option value="'+(t+100)+'">克制'+pw.database.types.names['zh-cn'][t]+'</option>';
	}
	return h;
}()
+'				</select></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">能力</label>'
+'				<div class="col-8"><select class="form-control" name="shuffledex-skill">'
+'					<option value="-1">-</option>'
+function(){
	var h = '';
	for ( var t=0; t<pw.poketoru.skillOrder.length; t++ ) {
		h += '<option value="'+pw.poketoru.skillOrder[t]+'">'+pw.poketoru.skillList[pw.poketoru.skillOrder[t]][0]+'</option>';
	}
	return h;
}()
+'				</select></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">基础攻击力</label>'
+'				<div class="col-8"><select class=" form-control" name="shuffledex-attack"><option value="-1">-</option>'
+'					<option value="1">30</option>'
+'					<option value="2">40</option>'
+'					<option value="3">50</option>'
+'					<option value="4">60</option>'
+'					<option value="5">70</option>'
+'					<option value="6">80</option>'
+'					<option value="7">90</option>'
+'				</select></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">最大等级提升</label>'
+'				<div class="col-8"><select class=" form-control" name="shuffledex-rml"><option value="-1">5</option>'
+'					<option value="10">≥10</option>'
+'					<option value="15">≥15</option>'
+'					<option value="20">≥20</option>'
+'				</select></div>'
+'			</div>'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label">超级进化</label>'
+'				<div class="col-8"><div class="checkbox"><label><input type="checkbox" name="shuffledex-ismega"> 有</label></div></div>'
+'			</div>'
		+'<hr />'
+'			<div class="form-group row">'
+'				<label class="col-4 control-label"></label>'
+'				<div class="col-8"><button type="button" class="btn btn-primary m-1 shuffledex__search">搜索</button><button type="button" class="btn btn-default m-1 shuffledex__reset">重置</button></div>'
+'			</div>'
		
		+'	</div>'

+'		<div class="col-12 col-lg-9 shuffledex__resultcontainer" style="overflow-y: auto;max-height: 500px;">'
+'		<table class="table table-sm text-center shuffledex-result">'
+'			<thead>'
+'				<tr><th>编号</th><th>图标</th><th>宝可梦</th><th>属性</th><th>基础攻击力</th><th>最大等级提升</th><th>最大攻击力</th><th>初始能力</th></tr>'
+'			</thead>'
+'			<tbody>'
+'			</tbody>'
+'		</table>'
+'		</div>'

		+'</div></div>'

+'		<div class="tab-pane fade" id="shuffledex-pokemontab">'
+'		</div>'


+'		</div>'
+'		</div>'
+'		</div>'
;
	$('.pw-jscontent, #shuffledex').html(html);
	
	$('.shuffledex__search').click(poketoruDex.searchClick);
	$('.shuffledex__reset').click(poketoruDex.resetClick);

	},
	
	searchClick : function() {
		var selectedType = parseInt($('select[name=shuffledex-type]').val(),10);
		var selectedSkill = parseInt($('select[name=shuffledex-skill]').val(),10);
		var selectedPower = parseInt($('select[name=shuffledex-attack]').val(),10);
		var selectedRml = parseInt($('select[name=shuffledex-rml]').val(),10);
		var selectedMega = $('input[name=shuffledex-ismega]').is(':checked');
		var sort = parseInt($('select[name=shuffledex-sort]').val(),10);
		
		if ( selectedType ==  -1 && selectedSkill == -1 && selectedPower == -1 && selectedRml == -1 && !selectedMega ) return;
		
		var isSuperEffect = selectedType >= 100;
		if ( isSuperEffect ) {
			selectedType -= 100;
			var superEffects = pw.poketoru.superEffects[selectedType];
		}

		var tbody = '';
		var count = 0;
		var result = [];
		$.each( pw.poketoru.pokemonList, function( pkmnID, pkmn ) {
			if ( pkmn.isMega ) return;
			if ( selectedSkill >= 0 && $.inArray(selectedSkill, pkmn.skills)==-1 ) return;
			if ( selectedPower >= 0 && pkmn.category != selectedPower ) return;
			if ( isSuperEffect ) {
				if ( $.inArray(pkmn.type, superEffects)==-1 ) return;
			} else {
				if ( selectedType >= 0 && pkmn.type != selectedType ) return;
			}
			if ( selectedRml > -1 && (pkmn.rml||0) < selectedRml ) return;
			if ( selectedMega && !pkmn.hasMega ) return;
			pkmn.maxPower = pw.poketoru.maxPower[pkmn.category][10+(pkmn.rml||0)];
			result.push(pkmn);
			count += 1;
		});
		if ( result.length > 500 ) {
			alert('something wrong');
			return;
		}
		
		if ( sort == 1 ) {
			result.sort(function(pkmn1, pkmn2) {
				return pkmn2.maxLevel - pkmn1.maxLevel;
			});
		} else if ( sort == 2 ) {
			result.sort(function(pkmn1, pkmn2) {
				return pkmn2.maxPower - pkmn1.maxPower;
			});
		} else if ( sort == 3 ) {
			result.sort(function(pkmn1, pkmn2) {
				return pkmn1.type - pkmn2.type;
			});
		}
		var oldSortValue = -1;
		var stripIndex = 0;
		$.each( result, function( i, pkmn ) {
			var pkmnID = pkmn.id;
			var pkmnNumber = pkmnID.split('.')[0];
			var pkmnSkill = pw.poketoru.skillList[pkmn.skills[0]][0];
			var maxPower = 0;
			var newSortValue = [pkmnNumber,pkmn.maxLevel,pkmn.maxPower,pkmn.type][sort];
			stripIndex=1;
			//if ( oldSortValue == -1 || oldSortValue != newSortValue ) stripIndex = (stripIndex==0)?1:0;
			oldSortValue = newSortValue;
			var pkmnName = pw.util.getPokemonName(pkmnID).fullname.replace(/[（）]/g,'～');
			pkmnName = pkmnName.replace(/～(.+?)～/,'<div style="line-height: 12px;font-size: 12px;transform: scale(0.7);">$1</div>');
			pkmnName = '<a href="#" class="shuffledex-pkmnlink" data-pid="'+pkmnID+'">' + pkmnName + '</a>';
			tbody += '<tr style="'+(stripIndex?'':'background-color:#f2f2f2;')+'">'
				+'<td>'+pkmn.dex+'</td>'
				+'<td><div class="shufflepokemon" data-pid="'+pkmnID+'">' + pw.sprite.create('poketoru',pkmnID,null,32) + '</div></td>'
				+'<td>'+pkmnName+'</td>'
				+'<td>'+pw.util.createColorlabel('span','type',pw.database.types.names['zh-cn'][pkmn.type])+'</td>'
				+'<td>'+pw.poketoru.maxPower[pkmn.category][1]+'</td>'
				+'<td>'+(pkmn.rml?'+'+pkmn.rml:'-')+'</td>'
				+'<td>'+pkmn.maxPower+'</td>'
				+'<td>'+pkmnSkill+'</td>'
				+'</tr>';
		});

		var $table= $(".shuffledex-result tbody");
		$table.html(tbody);
		$("#shuffledex-resultcount").html(count);
		pw.poketoru.createPoketoruTooltips();

		$('.shuffledex-pkmnlink').click(function(){
			poketoruDex.createPokemonPage($(this).data('pid').toString());
			return false;
		});
	},
	
	resetClick : function() {
		$('select[name=shuffledex-type]').val(-1);
		$('select[name=shuffledex-skill]').val(-1);
		$('select[name=shuffledex-attackpower]').val(-1);
		$('select[name=shuffledex-rml]').val(-1);
		$('input[name=shuffledex-ismega]').attr('checked',false);
	},
	
	createPokemonPage : function( pkmnID ) {
	var html = ''
+'<div class="row">'
+'		<div class="col-12 col-md-4" style="padding:0 1em;">'
+'			<h3>{pkmnname}</h3>'
+'			<div>'
+'			<div class="col-4">{pkmnicon}</div>'
+'			<div class="col-8 shuffle-data">'
+'				<div class="row"><div class="col-4">推荐度</div><div class="col-8">{pkmnrank}</div></div>'
+'				<div class="row"><div class="col-4">属性</div><div class="col-8">{pkmntype}</div></div>'
+'				<div class="row"><div class="col-4">攻击力</div><div class="col-8">{pkmnattack}</div></div>'
+'				<div class="row"><div class="col-4">最大等级</div><div class="col-8"><img src="/w/images/thumb/b/b9/Shuffle_Raise_Max_Level.png/32px-Shuffle_Raise_Max_Level.png" width="16" height="16">0/{pkmnrml}</div></div>'
+'			</div>'
+'			</div>{pkmnmega}{pkmnform}'
+'		</div>'
+'		<div class="col-12 col-md-4" style="padding:0 1em;">'
+'			<h3>能力</h3>'
+'			{pkmnskills}'
+'		</div>'
+'		<div class="col-12 col-md-4" style="padding:0 1em;">'
+'			<h3>攻击力</h3>'
+'			<table class="shuffle-table">'
+'			<tr>'
+'				<th>等级</th><th>攻击力</th><th>攻击力增加</th><th>升级经验</th><th>总经验</th>'
+'			</tr>'
+'			{pkmnlevels}'
+'		</div>'
+'	</div>'
+'';

		var pkmnNumber = pkmnID.split('.')[0];
		var pkmnForm = pkmnID.split('.')[1];

		var pkmn = pw.poketoru.getPokemonData(pkmnID);
		if ( pkmn.isMega ) {
			$.each( pw.poketoru.megaList, function(k,v) {
				if ( $.inArray( pkmnID, v )>-1 ) {
					pkmnID = k;
					return false;
				}
			});
			pkmn = pw.poketoru.getPokemonData(pkmnID);
			//if ( !pkmn ) return false;
		}
		
		var maxLevel = 10 + (pkmn.rml||0);
		var pkmnPower = pw.poketoru.maxPower[pkmn.category][1] + '～' + pw.poketoru.maxPower[pkmn.category][10];
		if ( !!pkmn.rml ) pkmnPower += '～' + pw.poketoru.maxPower[pkmn.category][maxLevel];

		html = html.replace( '{pkmnicon}', '<img src="' + pw.poketoru.getPoketoruIconSrc(pkmnID) + '" />' );
		html = html.replace( '{pkmntype}', pw.util.createColorlabel('span','type',pw.database.types.names['zh-cn'][pkmn.type]) );
		html = html.replace( '{pkmnname}', pw.util.getPokemonName(pkmnID).fullname.replace(/[（）]/g,'～') );
		html = html.replace( '{pkmnattack}', pkmnPower );
		html = html.replace( '{pkmnrank}', pkmn.rank );
		html = html.replace( '{pkmnrml}', pkmn.rml||0 );

		var htmlLevel = '';
		var totalexp = 0;
		for (var lv=1;lv<=maxLevel;lv++) {
			if ( lv==1 || lv==11 || lv==16 || lv==21 || lv==26 ) htmlLevel += '<tr><td colspan="5" style="border-bottom:1px solid #ddd;"></td>';
			var rad = '<input class="shuffledex-edit" name="shuffledex-editlevel" type="radio" value="'+lv+'"/>';
			var power = pw.poketoru.maxPower[pkmn.category][lv];
			var powerinc = ( lv>1 ) ? '+' + (power - pw.poketoru.maxPower[pkmn.category][lv-1]) : '-';
			var exp = ( lv>1 ) ? pw.poketoru.maxExp[pkmn.category][lv-1] : 0;
			totalexp += exp;
			htmlLevel += '<tr class="shuffledex-editparent"><td>' + lv + rad + '</td><td>' + power + '</td><td>'+ powerinc +'<td>' + (exp?exp:'-') + '</td>' +'<td>' + (totalexp?totalexp:'-') + '</td>';
		}
		html = html.replace( '{pkmnlevels}', htmlLevel );

		var htmlSkill = '';
		$.each( pkmn.skills, function(i,s){
			var $skill = $(pw.poketoru.skillHtml);
			var skillname = pw.poketoru.skillList[s][0];
			var skillData = pw.poketoru.skillList[s][2];
			skillname = '<a href="#" class="shuffledex-searchlink" data-skill="'+s+'">' + skillname + '</a>';

			if ( i > 0 ) { skillname = '<img src="/w/images/thumb/e/e1/Shuffle_Skill_Swapper.png/24px-Shuffle_Skill_Swapper.png" />' + skillname; }
			var basicRate = ( skillData[1]>0? skillData[1]+'%':'-' ) + ' / ' + ( skillData[2]>0? skillData[2]+'%':'-' ) + ' / ' + ( skillData[3]>0? skillData[3]+'%':'-' );
			var r = ['-','-','-','-'];
			var d = ['-','-','-','-'];
			if ( skillData[4] == 1 ) {
				r[0]='+' + skillData[5] + '%';
				r[1]='+' + skillData[6] + '%';
				r[2]='+' + skillData[7] + '%';
				r[3]='+' + skillData[8] + '%';
			} else if ( skillData[4] == 2 ) {
				for ( var j=0;j<=3;j++ ) {
					var basicDamage = pkmn.maxPower * skillData[0] * skillData[5+j];
					if ( pkmn.type > 0 ) basicDamage *= 2; // non-normal type
					if ( s == 9 ) basicDamage *= 3; // risk-taker
					d[j] = '<span title="' + (skillData[1]>0?Math.round(basicDamage):'-') + ' / ' + (skillData[2]>0?Math.round(basicDamage*1.5):'-') + ' / ' + (skillData[3]>0?Math.round(basicDamage*2):'-') + '">×' + skillData[5+j] + '</span>';
				}
			}

			htmlSkill += '<div style="border-left:3px solid silver;padding: 0 0 0 3px; margin: 0.5em 0;line-height:24px;"><b>' + skillname + '</b><div style="float:right;font-size:small;">' + pw.poketoru.skillList[s][1] + '</div></div>';
			htmlSkill += '<table class="shuffle-table">';
			htmlSkill += '<tr class="shuffledex-editparent"><th style="width:25%;">等级</th>';
			htmlSkill += '<th style="width:25%;">1<input class="shuffledex-edit" name="shuffledex-editskill" type="radio" value="'+s+'.1" /></th>';
			htmlSkill += '<th>2<input class="shuffledex-edit" name="shuffledex-editskill" type="radio" value="'+s+'.2" /></th>';
			htmlSkill += '<th>3<input class="shuffledex-edit" name="shuffledex-editskill" type="radio" value="'+s+'.3" /></th>';
			htmlSkill += '<th>4<input class="shuffledex-edit" name="shuffledex-editskill" type="radio" value="'+s+'.4" /></th>';
			htmlSkill += '<th>5<input class="shuffledex-edit" name="shuffledex-editskill" type="radio" value="'+s+'.5" /></th>';
			htmlSkill += '<tr><td>发动几率</td><td>' + basicRate + '</td><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>';
			htmlSkill += '<tr><td>伤害倍率</td><td>'+skillData[0]+'</td><td>'+d[0]+'</td><td>'+d[1]+'</td><td>'+d[2]+'</td><td>'+d[3]+'</td></tr>';
			htmlSkill += '<tr><td>升级经验</td><td>-</td><td>'+skillData[9]+'</td><td>'+skillData[10]+'</td><td>'+skillData[11]+'</td><td>'+skillData[12]+'</td></tr>';
			htmlSkill += '</table>';
		});
		html = html.replace( '{pkmnskills}', htmlSkill );

		var htmlMega = '';
		if ( pkmn.hasMega ) {
			$.each( pw.poketoru.megaList[pkmnID], function(i, megaID) {
				var mega = pw.poketoru.getPokemonData(megaID);
				var megaEffects = pw.poketoru.megaEffects[mega.skills[0]].replace('$1',mega.name);
				htmlMega += '<h3>'+pw.util.getPokemonName(megaID).fullname.replace(/[（）]/g,'～')+'</h3>';
				htmlMega += '<div class="row">';
				htmlMega += '<div class="col-4"><img src="' + pw.poketoru.getPoketoruIconSrc(megaID) + '" /></div>';
				htmlMega += '<div class="col-8 shuffle-data">';
				htmlMega += '<div class="row"><div class="col-4">属性</div><div class="col-8">'+pw.util.createColorlabel('span','type',pw.database.types.names['zh-cn'][mega.type])+'</div></div>';
				htmlMega += '<div class="row"><div class="col-4">超级进化速度</div><div class="col-8">'+mega.mb+'</div></div>';
				htmlMega += '<div class="row shuffledex-editparent"><div class="col-4">超级进化加速</div><div class="col-xs-1"></div><div class="col-xs-6"><img src="/w/images/thumb/e/e7/Shuffle_Mega_Speedup.png/24px-Shuffle_Mega_Speedup.png" />'+mega.msu+'</div><div class="col-xs-1"><input class="shuffledex-edit" name="shuffledex-editmsu" type="checkbox" value="'+mega.msu+'" /></div></div>';
				htmlMega += '<div class="row"><div class="col-4">超级进化效果</div><div class="col-8">'+megaEffects+'</div></div>';
				htmlMega += '</div>';
				htmlMega += '</div>';
			});
		}
		html = html.replace( '{pkmnmega}', htmlMega );

		var htmlForm = '';
		var pkmnNumber = pkmnID.split('.')[0];
		var formCount = 0;
		for ( var fi = 0; ; fi++ ) {
			var formID = pkmnNumber + '.' + ("0"+fi).slice(-2);
			var form = pw.poketoru.getPokemonData(formID);
			if ( form ) {
				if ( form.isMega ) continue;
				htmlForm += '<a href="#" class="shuffledex-pkmnlink" data-pid="'+formID+'"><img class="shufflepokemon" src="' + pw.poketoru.getPoketoruIconSrc(formID) + '" data-pid="'+formID+'" style="width:48px;" /></a>';
				formCount++;
			} else if ( pkmnNumber == '025' && fi < 40 ) {
				continue;
			} else {
				break;
			}
		}
		if ( formCount > 1 ) {
			htmlForm = '<h3 class="col-xs-12">所有形态</h3><div class="col-xs-12">' + htmlForm + '</div>';
			html = html.replace( '{pkmnform}', htmlForm );
		} else { html = html.replace( '{pkmnform}', '' ); }

		poketoruDex.flip('pokemon');
		$('#shuffledex-pokemontab').html(html);
		$('#shuffledex-pokemonpage').data('pid',pkmnID);

		$('.shuffledex-searchlink').click(function(){
			$('#shuffledex-return').click();
			$('#shuffledex-reset').click();
			$('select[name=shuffledex-skill]').val($(this).data('skill'));
			$('#shuffledex-search').click();
			return false;
		});
		$('#shuffledex-pokemonpage .shuffledex-pkmnlink').click(function(){
			pw.poketoru.createPokemonPage($(this).data('pid').toString());
			return false;
		});

	},
	
	flip : function( pagename ) {
		$('.shuffledex__' + pagename + 'nav').tab('show');
	},
		
	getTypeIndex : function( type ) {
		var index = -1;
		index = $.inArray( type, pw.database.types.names['zh-cn'] );
		if ( index == -1 ) index = $.inArray( type, ["普","斗","飞","毒","地","岩","虫","鬼","钢","火","水","草","电","超","冰","龙","恶","妖"] );
		return index;
	},
	
	checkHash : function(){
		var hash = window.location.hash.substring(1);
		if ( hash.substring(-1,1) == '.' ) hash = decodeURI(hash.replace(/\./g,'%'));
		if ( hash.match(/\d+\.\d+/) ) {
			poketoruDex.createPokemonPage(hash);
		} else if ( hash.substring(-2,2) == '克制' ) {
			var v = poketoruDex.getTypeIndex(hash.substring(2));
			$('select[name=shuffledex-type]').val(v+100);
			$('#shuffledex-search').click();
		} else if ( hash.match(/skill\-\d+/) ) {
			var v = hash.substring(6);
			$('select[name=shuffledex-skill]').val(v);
			$('#shuffledex-search').click();
		} else {
			var v = poketoruDex.getTypeIndex(hash);
			if ( v > -1 ) {
				$('select[name=shuffledex-type]').val(v);
				$('#shuffledex-search').click();
			}
		}
	},
	
	
};

pokeWiki.loader.using( [ 'pokemon.js', 'poketoru.js','poketoru.pokemon.js', 'bootstrap' ], function() {
	poketoruDex.init();
});