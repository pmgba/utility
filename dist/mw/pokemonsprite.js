pw.sprite={lastFormID:["003.01","006.02","009.01","015.01","018.01","019.01","020.02","025.07","026.01","027.01","028.01","037.01","038.01","050.01","051.01","052.01","053.01","065.01","074.01","075.01","076.01","080.01","088.01","089.01","094.01","103.01","105.02","115.01","127.01","130.01","142.01","150.02","175.01","181.01","201.27","208.01","212.01","214.01","229.01","248.01","254.01","257.01","260.01","282.01","302.01","303.01","306.01","308.01","310.01","319.01","323.01","334.01","351.03","354.01","359.01","362.01","373.01","376.01","380.01","381.01","382.01","383.01","384.01","386.03","412.02","413.02","421.01","422.01","423.01","428.01","445.01","448.01","460.01","475.01","479.05","487.01","492.01","521.99","531.01","550.01","555.01","585.03","586.03","592.99","593.99","641.01","642.01","645.01","646.02","647.01","648.01","649.04","658.02","660.19","668.99","669.04","670.05","671.04","676.09","678.01","681.01","710.03","711.03","716.01","718.04","719.01","720.01","735.01","738.01","741.03","743.01","744.01","745.02","746.01","752.01","754.01","758.01","774.13","777.01","778.02","784.01","800.03","801.01"],fullFormIDList:[],fillFormList:function(){for(var a=0;a<pw.sprite.lastFormID.length-1;a++){var b=pw.sprite.lastFormID[a].split(".");if("99"==b[1])pw.sprite.fullFormIDList.push(pw.sprite.lastFormID[a]);else for(var c=1;c<=parseInt(b[1]);c++)pw.sprite.fullFormIDList.push(pw.util.getPokemonKey(b[0],c))}},init:function(){pw.sprite.fillFormList()},apply:function(){$(".js-sprite").each(function(){var a=$(this),b=a.data("ver"),c=a.data("pid"),d=a.data("val"),e=a.data("width"),f=pw.sprite.create(b,String(c),d,e);f&&(a.html(f),a.removeClass("js-sprite"))})},create:function(a,b,c,d){if("pi"===a){var e={},f=parseInt(b.slice(0,3),10),g=parseInt(b.slice(-2),10),h=0==g?-1:pw.sprite.fullFormIDList.indexOf(b);return-1==h?(e.i=f,e.url="http://res.pokemon.name/common/pokemon/pi.png"):(e.i=h,e.url="http://res.pokemon.name/common/pokemon/pi2.png"),e.r=10,e.w=40,e.h=30,pw.sprite.createHtml(e.url,e.w,e.h,e.r,e.i,d)}if(a in pw.sprite.modules){var e=pw.sprite.modules[a];return e.getIndex&&(c=e.getIndex(b)),pw.sprite.createHtml(e.url,e.width,e.height,e.col,c,d)}},createHtml:function(a,b,c,d,e,f){if(f){f=String(f).replace("px","");var g=f/b,h='<div style="display:inline-block;vertical-align:bottom;background:url('+a+") no-repeat -"+b*(e%d)*g+"px -"+c*Math.floor(e/d)*g+"px;background-size: "+b*d*g+"px auto;height:"+c*g+"px;width:"+b*g+'px;"></div>'}else var h='<div style="display:inline-block;vertical-align:bottom;background:url('+a+") no-repeat -"+b*(e%d)+"px -"+c*Math.floor(e/d)+"px;height:"+c+"px;width:"+b+'px;"></div>';return h},modules:{type:{url:"http://www.pokemon.name/w/images/3/3d/Sprite_Type_Icons.png",width:48,height:48,col:1},quest:{url:"http://wx1.sinaimg.cn/large/9df85f1fgy1fsqavgbxp7j20e80xstb3.jpg",width:64,height:64,col:8},questmove:{url:"http://wx1.sinaimg.cn/large/9df85f1fgy1fsybpio4qbj20dc0mon2p.jpg",width:48,height:48,col:10}}},pw.sprite.init();