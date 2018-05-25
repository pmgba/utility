(function(){
	$('.js-columnformater').each(function(){
		var $table = $(this).next('table');
	  var colClass = $table.data('columnformater');
	  var ignoreEmpty = !!$table.data('ignoreEmpty');
	
		$.each( colClass, function( colIndex, value ) {
			$table.find('> tbody > tr').each(function(){
				var curIndex = 0;
				$.each( $(value).children(), function() {
					curIndex += $(this).attr('colspan') || 1;
					if ( curIndex >= colIndex ) {
						if ( skipEmpty && this.innerText.trim().length > 0 ) return false;
						if ( value.class ) $(this).addClass(value.class);
						if ( value.style ) this.style.cssText += value;
	          return false;
					}
				});
			});
		});
		
	});
})();