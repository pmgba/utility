(function(){
	pw.loader.using( ['jqueryui'], function () {
		$('.js-tabsections').each( function ( index ) {
			var $tab = $(this);
			var $h = $tab.next();
			if ( !$h.is('h2,h3,h4,h5') ) return;
	
			var h = $h.prop("tagName").toLowerCase();
			var $ul = $('<ul></ul>');
			$tab.append($ul);
	
			var i=0;
			var tabs = [];
			$tab.nextUntil('h' + (parseInt(h.substr(-1))-1)).each( function () {
				var $this=$(this);
				if ( this.tagName.toLowerCase() == h ) {
					i ++;
					var id = 'tabs-' + index + '-' + i;
					$ul.append('<li><a href="#'+id+'">' + $('.mw-headline', this).text() + '</a></li>');
					tabs.push($('<div id="'+id+'"></div>'));
				}
					tabs[tabs.length - 1].append(this);
			});
			$tab.append(tabs);
			$tab.tabs();
		});
	});
})();
