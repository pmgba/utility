pw.whoami = {
	pkmnNumber : 0,
	
	init: function(){
		pw.loader.using( [ 'pokemon.js'], function(){
		$('.pw-whoami').html('<table style="width:100%;">'+
			'<td style="width:45%;"><div class="pw-whoami-wrapper portalbox-border"><div class="pw-whoami-sprite"><div class="pw-whoami-silhouette"></div></div></div></td>'+
			'<td style="text-align:center;"><b>我是谁？</b>'+
			'<form action="/wiki/%E7%89%B9%E6%AE%8A:%E6%90%9C%E7%B4%A2"><input name="search" type="text" class="pw-whoami-text portalbox-border" /><input name="go" class="pw-whoami-go" value="&#x1F50D;&#xFE0E;" type="submit"></form>'+
			'<a href="javascript:void(0);" onclick="pw.whoami.changePokemon();">[换一只]</a>'+
			'</td>'+
			'</table>'
		);
	
		$('.pw-whoami-wrapper').hover(
			function () { $('.pw-whoami-silhouette').fadeOut(1000, function() {
					$('.pw-whoami-text').val( pw.util.getPokemonName( pw.whoami.pkmnNumber ) );
				});
			}, 
			function () { }
		);
		
		pw.whoami.changePokemon();
		});
	},
	
	changePokemon: function () {
		pw.whoami.pkmnNumber = String('00').concat(Math.floor(Math.random()*(807-1) + 1)).slice(-3);
		var src=pw.util.getPokemonImageURL('pgl', pw.whoami.pkmnNumber );
		$('.pw-whoami-sprite').css( 'background-image','url('+src+')');
		$('.pw-whoami-silhouette').show().css( 'background-image','url('+src+')');
		$('.pw-whoami-text').val( '' );
	},
};