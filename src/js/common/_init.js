if ( pw.config.get('isMediaWiki') ) 
(function(){
	
	if ( $('.import, .js-import').length > 0 ) {
		var scriptList = [];
    $('.import, .js-import').each(function(){
      var extraCSS = this.getAttribute('data-css'), extraJS = this.getAttribute('data-script');
      if ( extraCSS && $.inArray( extraCSS, scriptList ) === -1 ) { scriptList.push(extraCSS); }
      if ( extraJS && $.inArray( extraJS, scriptList ) === -1 ) { scriptList.push(extraJS); }
    });
  	if ( scriptList.length > 0 ) pw.loader.using( scriptList );
	}
	
	//if ( $('.js-widget').length > 0 ) pw.loader.using( 'widgets/widgets.js' );
  
	if ( $('.fa').length > 0 ) pw.loader.using( 'font-awesome' );
	if ( $('.ion').length > 0 ) pw.loader.using( 'ionicons' );
	if ( $('.flag-icon').length > 0 ) pw.loader.using( 'flag' );
	
	if ( $('.tex').length > 0 ) {
		pw.loader.using( 'katex', function() {
      $('.tex').each(function(){
        katex.render($(this).text(),this);
      });
		});
	}
	
	if ( $('.js-sprite').length > 0 ) {
		pw.loader.using( 'pokemonsprite.js', function() {
      pw.sprite.apply();
		});
	}
	
	$('.chart').each(function() {
		pw.loader.using( 'chart', function() {
      $e.each(function(){
        var $this = $(this);
        var $ctx = $('<canvas width="'+$this.width()+'px" height="'+$this.height()+'px"></canvas>');
        $(this).append($ctx);
        var config = $this.data("config");
        if ( ! config ) { return true; }
        var myChart = new Chart( $ctx, config );
      });
	   } );
	});
	
	if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {
  	pw.loader.using( 'edit.js' );
  } else if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' && !mw.user.options.get('usenewrc') ) {
  	pw.loader.using( 'specialpage.recentchanges.js' );
  }
	/********************/
  	/*
  	"table.customcolumn" : function($e) {
  		pw.loader.using( 'snippets/table.customcolumn.js' );
  	},
  */ 

	pw.autosave.init();
})();