pw.sprite = {
	lastFormID : ["003.01","006.02","009.01","015.01","018.01","019.01","020.02","025.07","026.01","027.01","028.01","037.01","038.01","050.01","051.01","052.01","053.01","065.01","074.01","075.01","076.01","080.01","088.01","089.01","094.01","103.01","105.02","115.01","127.01","130.01","142.01","150.02","175.01","181.01","201.27","208.01","212.01","214.01","229.01","248.01","254.01","257.01","260.01","282.01","302.01","303.01","306.01","308.01","310.01","319.01","323.01","334.01","351.03","354.01","359.01","362.01","373.01","376.01","380.01","381.01","382.01","383.01","384.01","386.03","412.02","413.02","421.01","422.01","423.01","428.01","445.01","448.01","460.01","475.01","479.05","487.01","492.01","521.99","531.01","550.01","555.01","585.03","586.03","592.99","593.99","641.01","642.01","645.01","646.02","647.01","648.01","649.04","658.02","660.19","668.99","669.04","670.05","671.04","676.09","678.01","681.01","710.03","711.03","716.01","718.04","719.01","720.01","735.01","738.01","741.03","743.01","744.01","745.02","746.01","752.01","754.01","758.01","774.13","777.01","778.02","784.01","800.03","801.01"],
	fullFormIDList : [],
	
	fillFormList : function(){
		for (var i=0;i<pw.sprite.lastFormID.length-1;i++) {
			var x = pw.sprite.lastFormID[i].split('.');
			if (x[1] == '99') {
				pw.sprite.fullFormIDList.push(pw.sprite.lastFormID[i]);
			} else {
				for (var j=1;j<=parseInt(x[1]);j++) {
					pw.sprite.fullFormIDList.push(pw.util.getPokemonKey(x[0],j));
				}
			}
		}
	},

	init : function() {
		pw.sprite.fillFormList();
	},
	
	apply : function() {
		$('.js-sprite').each( function(){
			var $this = $(this);
			var ver = $this.data('ver');
			var pid = $this.data('pid');
			var val = $this.data('val');
			var width = $this.data('width');
			var html = pw.sprite.create( ver, String(pid), val, width );
			if ( html ) {
				$this.html( html );
				$this.removeClass('js-sprite');
			}
		});
	},
	
	create : function( ver, pid, val, width ) {
		if ( ver === 'pi' ) {
			var opt = {};
			var num = parseInt(pid.slice(0,3),10);
			var fi  = parseInt(pid.slice(-2),10);
			var fil = ( fi == 0 ) ? -1 : pw.sprite.fullFormIDList.indexOf(pid);
			if ( fil == -1 ) {
				opt.i = num;
				opt.url = 'http://res.pokemon.name/common/pokemon/pi.png';
			} else {
				opt.i = fil;
				opt.url = 'http://res.pokemon.name/common/pokemon/pi2.png';
			}
			opt.r = 10; opt.w = 40; opt.h = 30;
			return pw.sprite.createHtml( opt.url, opt.w, opt.h, opt.r, opt.i, width );
		} else if ( ver in pw.sprite.modules ) {
			var opt = pw.sprite.modules[ver];
			if ( opt.getIndex ) val = opt.getIndex(pid);
			return pw.sprite.createHtml( opt.url, opt.width, opt.height, opt.col, val, width );
		}
	},

	createHtml : function( url, w, h, r, i, s ) {
		if ( s ) {
			s = String(s).replace('px','');
			var c = s / w;
			var html =  '<div style="display:inline-block;vertical-align:bottom;'+
				'background:url(' + url + ') no-repeat -' + ( w * ( i % r ) * c ) + 'px -' + ( h * Math.floor( i / r ) * c ) + 'px;'+
				'background-size: ' + ( w * r * c ) + 'px auto;'+
				'height:'+ h * c + 'px;'+
				'width:'+ w * c + 'px;'+
			'"></div>';
		} else {
			var html =  '<div style="display:inline-block;vertical-align:bottom;'+
				'background:url(' + url + ') no-repeat -' + ( w * ( i % r ) ) + 'px -' + ( h * Math.floor( i / r ) ) + 'px;'+
				'height:'+ h + 'px;'+
				'width:'+ w + 'px;'+
			'"></div>';
		}
		return html;
	},
	
	modules : {
		'type' : {
				url : 'http://www.pokemon.name/w/images/3/3d/Sprite_Type_Icons.png',
				width : 48,
				height : 48,
				col : 1
		},
	}
};

pw.sprite.init();