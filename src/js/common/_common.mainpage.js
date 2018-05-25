if ( mw.config.get('wgIsMainPage') ) {
var whoami = {
	pkmnNumber : 0,
	
	init: function(){
		$('.pw-whoami').html('<table style="width:100%;">'+
			'<td style="width:45%;"><div class="pw-whoami__wrapper mpbox-border"><div class="pw-whoami__sprite"><div class="pw-whoami__silhouette"></div></div></div></td>'+
			'<td><b>我是谁？</b>'+
			'<form action="/wiki/%E7%89%B9%E6%AE%8A:%E6%90%9C%E7%B4%A2"><input name="search" type="text" class="pw-whoami__text mpbox-border" /><input name="go" class="pw-whoami__go" value="&#x1F50D;&#xFE0E;" type="submit"></form>'+
			'<a href="javascript:void(0);" onclick="whoami.changePokemon();">[换一只]</a>'+
			'</td>'+
			'</table>'
		);
	
		$('.pw-whoami__wrapper').hover(
			function () { $('.pw-whoami__silhouette').fadeOut(1000, function() {
					$('.pw-whoami__text').val( pw.util.getPokemonName( whoami.pkmnNumber ) );
				});
			}, 
			function () { }
		);
		
		whoami.changePokemon();
	},
	
	changePokemon: function () {
		whoami.pkmnNumber = String('00').concat(Math.floor(Math.random()*(807-1) + 1)).slice(-3);
		var src=pw.util.getPokemonImageURL('pgl', whoami.pkmnNumber );
		$('.pw-whoami__sprite').css( 'background-image','url('+src+')');
		$('.pw-whoami__silhouette').show().css( 'background-image','url('+src+')');
		$('.pw-whoami__text').val( '' );
	},
};

whoami.init();

}