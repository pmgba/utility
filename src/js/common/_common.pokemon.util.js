$.extend( true, pokeWiki, {
	util: {
    getResUrl : function( url ) {
      var respath = pokeWiki.config.get('pwResPath').replace(/\/+$/,'');
      url = ( url || '' ).replace(/^\/+/,'');
      return ( respath + '/' + url ).toLowerCase();
    },
    
		getPokemonImageURL: function( type, pid ) {
			type = type.toLowerCase();
			pid = pokeWiki.util.getPokemonKey(pid);
			if ( type == 'pdw' ) {
				return pokeWiki.util.getResUrl( '/common/pokemon/pdw/' + pid + '.png' );
			} else if ( type == 'pgl' ) {
				return pokeWiki.util.getResUrl( '/common/pokemon/pgl/' + pid + '.png' );
			} else if ( type == 'icon' ) {
				return pokeWiki.util.getResUrl( '/common/pokemon/icons/' + pid + '.png' );
			} else {
				return false;
			}
		},
		createPokemonIcon: function( pid ) {
			return '<img src="' + pokeWiki.util.getPokemonImageURL( 'icon', pid ) + '" />';
		},
		createPokemonIconS: function( pid ) {
			return '<span class="sprite sprite--pi" data-pid="'+pid+'"></span>';
		},
		createPokemonImage: function( type, pid, style ) {
			style = style || '';
			var src = pokeWiki.util.getPokemonImageURL( type, pid );
			if ( src ) {
				return '<img src="' + src + '" style="' + style + '"/>';
			} else {
				return '';
			}
		},
		createPokemonSprite: function( version, pid ) {
			var src = pokeWiki.util.getResUrl( '/sprites/core/' + version + '/front/' + pid + '.png' );
			return '<img src="' + src + '" />';
		},
		getPokemonKey : function ( dexNumber, formIndex ) {
			if ( dexNumber.length == 6 ) {
				return dexNumber;
			} else {
				formIndex = formIndex || 0;
				dexNumber = String('00').concat(dexNumber).slice(-3);
				formIndex = String('00').concat(formIndex).slice(-2);
				return dexNumber + "." + formIndex;
			}
		},
		getInfo : function ( varName, def ) {
			return pw.info[varName] || def;
		},
		getGenerationByPokemonNumber : function ( num ) {
			var maxPokemonCounts = pw.util.getInfo("maxPokemonCounts");
			for ( var g = 0; g < maxPokemonCounts.length; g++ ) {
				if ( num <= maxPokemonCounts[g] ) return g;
			}
			return 0;
		},
		getPokemonName : function ( key, format, lang ) {
			lang = lang || 'zh-cn';
			format = format || '{0}（{1}）';
			if ( key.length == 6 ) {
				var name = "", formname = "", fullname = "";
				name = pokeWiki.database.pokemon.names[lang][parseInt(key.split('.')[0],10)];
				if ( key in pokeWiki.database.pokemon.forms[lang] ) {
					var form = pokeWiki.database.pokemon.forms[lang][key];
					if ( Array.isArray(form) ) {
						formname = form[0];
						format = form[1];
					} else {
						formname = form;
					}
					if ( !formname ) {
						fullname = name;
					} else if ( formname.indexOf(name) > -1 ) {
						fullname = formname;
					} else {
						fullname = format.replace('{0}',name).replace('{1}',formname);
					}
				} else {
					fullname = name;
				}
				return {
					name: name,
					form: formname,
					fullname: fullname
				};
			} else {
				return pw.database.pokemon.names[lang][parseInt(key,10)];
			}
		},
	}
});