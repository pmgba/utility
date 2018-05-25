(function() {
	
	$.each({
		".colortable-width-full": "ablock-full",
		".colortable-width-half": "ablock-half",
		".colortable-width-full, .colortable-width-half": "articletable",
		".colortable-hover ": "articletable-hover",
		".colortable-nester, .colortable-nested ": "colortable-container",
		".colortable-container > .colortable ": "colortable-child",
	}, function(k,v){
		$(k).addClass(v);
	});
	
	$('.articletable').each(function(){
		var $tr = $(this).find('tbody tr:first-child:not(:has(td))').next();
		$tr.find('td:first-child').css('border-top-left-radius','0.35em');
		$tr.find('td:last-child').css('border-top-right-radius','0.35em');
	});
	
	$('.colortable td[rowspan]').each(function(){
		var $this = $(this);
		var span = $this.attr('rowspan');
		var curRow = $this.parent().index();
		var maxRow = $this.parent().parent().children().length;
		if ( curRow + parseInt(span,10) >= maxRow ) $this.addClass('b-b');
	});
	
	$('.colortable-child').parent().addClass('colortable-container');
	
	mw.loader.load('http://hm.baidu.com/h.js?5d5b68f5aaae57bdebbe134a5acde926');
	
})();