var TYPE_NORMAL=0,TYPE_FIGHTING=1,TYPE_FLYING=2,TYPE_POISON=3,TYPE_GROUND=4,TYPE_ROCK=5,TYPE_BUG=6,TYPE_GHOST=7,TYPE_STEEL=8,TYPE_FIRE=9,TYPE_WATER=10,TYPE_GRASS=11,TYPE_ELECTRIC=12,TYPE_PSYCHIC=13,TYPE_ICE=14,TYPE_DRAGON=15,TYPE_DARK=16,TYPE_FAIRY=17,ATTACK_FLYINGPRESS=560,ATTACK_FREEZEDRY=573;calc={typeEffects:{7:[[1,1,1,1,1,.5,1,0,.5,1,1,1,1,1,1,1,1,1],[2,1,.5,.5,1,2,.5,0,2,1,1,1,1,.5,2,1,2,.5],[1,2,1,1,1,.5,2,1,.5,1,1,2,.5,1,1,1,1,1],[1,1,1,.5,.5,.5,1,.5,0,1,1,2,1,1,1,1,1,2],[1,1,0,2,1,2,.5,1,2,2,1,.5,2,1,1,1,1,1],[1,.5,2,1,.5,1,2,1,.5,2,1,1,1,1,2,1,1,1],[1,.5,.5,.5,1,1,1,.5,.5,.5,1,2,1,2,1,1,2,.5],[0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,.5,1],[1,1,1,1,1,2,1,1,.5,.5,.5,1,.5,1,2,1,1,2],[1,1,1,1,1,.5,2,1,2,.5,.5,2,1,1,2,.5,1,1],[1,1,1,1,2,2,1,1,1,2,.5,.5,1,1,1,.5,1,1],[1,1,.5,.5,2,2,.5,1,.5,.5,2,.5,1,1,1,.5,1,1],[1,1,2,1,0,1,1,1,1,1,2,.5,.5,1,1,.5,1,1],[1,2,1,2,1,1,1,1,.5,1,1,1,1,.5,1,1,0,1],[1,1,2,1,2,1,1,1,.5,.5,.5,2,1,1,.5,2,1,1],[1,1,1,1,1,1,1,1,.5,1,1,1,1,1,1,2,1,0],[1,.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,.5,.5],[1,2,1,.5,1,1,1,1,.5,.5,1,1,1,1,1,2,2,1]]},createPokemonRow:function(a,b){var c="",d=a.split("."),e=pw.util.getPokemonName(a),f=pw.database.pokemon.data[7][a];c+='<tr style="line-height:30px;">',c+="<td>"+pw.sprite.create("pi",a)+"</td>",c+="<td>#"+d[0]+"</td>",c+='<td><a href="'+mw.util.getUrl(e.name)+'">'+e.fullname+"</a></td>";var g=pw.util.createColorlabel("span","type",pw.database.types.names["zh-cn"][f.types[0]]);return f.types[0]!=f.types[1]&&(g+=pw.util.createColorlabel("span","type",pw.database.types.names["zh-cn"][f.types[1]])),c+="<td>"+g+"</td>",c+="<td>"+b+"</td>",c+="</tr>"},createPanel:function(){var a='<div class="card pokedex"><div class="card-header">打击面查询器</div><div class="card-body"><div class="container-fluid">\t<form class="form-horizontal" role="form">\t\t<div class="row">\t\t\t<div class="col-12 col-lg-6">\t\t\t\t<div class="row form-group">\t\t\t\t\t<label class="col-2 control-label">招式1：</label>\t\t\t\t\t<div class="col-10"><select class="form-control calc-move"></select></div>\t\t\t\t</div>\t\t\t\t<div class="row form-group">\t\t\t\t\t<label class="col-2 control-label">招式2：</label>\t\t\t\t\t<div class="col-10"><select class="form-control calc-move"></select></div>\t\t\t\t</div>\t\t\t\t<div class="row form-group">\t\t\t\t\t<label class="col-2 control-label">招式3：</label>\t\t\t\t\t<div class="col-10"><select class="form-control calc-move"></select></div>\t\t\t\t</div>\t\t\t\t<div class="row form-group">\t\t\t\t\t<label class="col-2 control-label">招式4：</label>\t\t\t\t\t<div class="col-10"><select class="form-control calc-move"></select></div>\t\t\t\t</div>\t\t\t\t<div class="row form-group">\t\t\t\t\t<label class="col-2 control-label">自身属性：</label>\t\t\t\t\t<div class="col-5"><select class="form-control calc-selfType"></select></div>\t\t\t\t\t<div class="col-5"><select class="form-control calc-selfType"></select></div>\t\t\t\t</div>\t\t\t\t<div class="row form-group">\t\t\t\t\t<label class="col-2 control-label">抵抗系数：</label>\t\t\t\t\t<div class="col-10 btn-group" data-toggle="buttons">\t\t\t\t\t\t<label class="btn btn-default"><input type="radio" name="calc-resRate" class="calc-resRate" value="75" >＜75%</label>\t\t\t\t\t\t<label class="btn btn-default active"><input type="radio" name="calc-resRate" class="calc-resRate" value="100" checked>＜100%</label>\t\t\t\t\t\t<label class="btn btn-default"><input type="radio" name="calc-resRate" class="calc-resRate" value="101" >≤100%</label>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="row form-group">\t\t\t\t\t<label class="col-2 control-label">特殊规则：</label>\t\t\t\t\t<div class="col-10 btn-group" data-toggle="buttons">\t\t\t\t\t\t<label class="btn btn-default"><input type="checkbox" class="calc-revert">反转对战</label>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<ht />\t\t\t\t<div class="row form-group">\t\t\t\t\t<div class="col-offset-2 col-10">\t\t\t\t\t\t<button type="button" class="btn btn-primary" id="calc">计算</button>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>\t<div class="col-lg-6">\t\t<table class="table col-lg-12 table-condensed text-center calc-results">\t\t\t<thead>\t\t\t\t<tr><th style="width:10%">图标</th><th style="width:10%">编号</th><th style="width:40%">宝可梦</th><th style="width:20%">属性</th><th style="width:20%">最高倍率</th></tr>\t\t\t</thead>\t\t\t<tbody id="calc_resultbody">\t\t\t</tbody>\t\t</table>\t</div>';$(".pw-jscontent").html(a);var a="",b="",c=[];c.push([-1,"-"]),$.each(pw.database.types.names["zh-cn"],function(a,b){c.push([a,b])}),$.each(c,function(a,c){b+='<option value="'+c[0]+'">'+c[1]+"</option>"}),c.push([ATTACK_FLYINGPRESS,"飞身重压"]),c.push([ATTACK_FREEZEDRY,"冷冻干燥"]),$.each(c,function(b,c){a+='<option value="'+c[0]+'">'+c[1]+"</option>"}),$(".calc-move").html(a),$(".calc-selfType").html(b),$("#calc").click(calc.calc)},getRevertEffect:function(a){return 0==a?2:2==a?.5:.5==a?2:a},calcTypeEffect:function(a,b,c,d,e,f){var g=1;switch(f?(g=calc.getRevertEffect(calc.typeEffects[7][a][b]),c!=b&&(g*=calc.getRevertEffect(calc.typeEffects[7][a][c]))):(g=calc.typeEffects[7][a][b],c!=b&&(g*=calc.typeEffects[7][a][c])),d){case 0:break;case 10:a==TYPE_ELECTRIC&&(g=0);break;case 11:a==TYPE_WATER&&(g=0);break;case 18:a==TYPE_FIRE&&(g=0);break;case 25:g<=1&&(g=0);break;case 26:a==TYPE_GROUND&&(g=0);break;case 31:a==TYPE_ELECTRIC&&(g=0);break;case 47:a==TYPE_FIRE&&(g/=2),a==TYPE_ICE&&(g/=2);break;case 78:a==TYPE_ELECTRIC&&(g=0);break;case 85:a==TYPE_FIRE&&(g/=2);break;case 87:a==TYPE_WATER?g=0:a==TYPE_FIRE&&(g*=1.25);break;case 111:g>1&&(g*=.75);break;case 114:a==TYPE_WATER&&(g=0);break;case 116:g>1&&(g*=.75);break;case 157:a==TYPE_GRASS&&(g=0)}return e&&(g*=1.5),g},calc:function(){var a=[],b=[],c=[];$(".calc-move").each(function(){var c=parseInt($(this).val(),10);c>100?b.push(c):c>-1&&a.push(c)}),$(".calc-selfType").each(function(){var a=parseInt($(this).val(),10);a>-1&&c.push(a)});var d=$(".calc-revert")[0].checked,e=parseInt($(".calc-resRate:checked").val(),10)/100,f=b.indexOf(ATTACK_FLYINGPRESS)>=0,g=b.indexOf(ATTACK_FREEZEDRY)>=0,h="";$.each(pw.database.pokemon.data[7],function(b,i){var j=[];$.each(i.abilities,function(b,e){var h=[];if($.each(a,function(a,b){var f=c.indexOf(b)>=0;h[a]=calc.calcTypeEffect(b,i.types[0],i.types[1],e,f,d)}),f){var k=c.indexOf(TYPE_FIGHTING)>=0;h.push(calc.calcTypeEffect(TYPE_FIGHTING,i.types[0],i.types[1],e,k,d)*calc.calcTypeEffect(TYPE_FLYING,i.types[0],i.types[1],e,!1,d))}if(g){var k=c.indexOf(TYPE_ICE)>=0,l=calc.calcTypeEffect(TYPE_ICE,i.types[0],i.types[1],e,k,d);i.types[0]!=TYPE_WATER&&i.types[1]!=TYPE_WATER||(l*=4),h.push(l)}j[b]=Math.max.apply(null,h)});var k=Math.min.apply(null,j);k<e&&(h+=calc.createPokemonRow(b,k))}),$(".calc-results tbody").html(h)}},pw.loader.using(["pokemon.js","pokemon.7.js","pokemonsprite.js","bootstrap"],function(){calc.genNames=[""];for(var a=1;a<pw.info.maxPokemonCounts.length;a++)calc.genNames[a]="第"+"零一二三四五六七八九十"[a]+"世代";calc.createPanel()});