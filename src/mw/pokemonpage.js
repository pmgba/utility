(function(){
	/*
	mw.loader.using('jqueryui',function(){
		$('#pokemonforms li').each(function(i,v){
			$(this).html('<a href="#pokemonform-'+(i+1)+'">'+$(this).html()+'</a>');
		});
		$( "#pokemonforms" ).tabs();
	});
	*/
	$('.pp-tab-content:not(:first)').hide();
	$('.pp-tab-toggle:first').addClass('is-active');
	$('.pp-tab-toggle').each( function( index ){
		$(this).click(function(){
			if ( $(this).hasClass('is-active') ) return;
			$('.pp-tab-toggle').each( function( index2 ) {
				$(this).toggleClass( 'is-active', index === index2 );
			});
			$('.pp-tab-content').each( function( index2 ) {
				$(this).toggle( index === index2 );
			});
		});
	});
	
	mw.util.addCSS(''
+'.pp-tab-toggle:not(.is-active) { cursor: pointer; color: #0645ad; }'
+'.pp-tab-toggle.is-active { color: black; font-weight: bold; }'
);

})();