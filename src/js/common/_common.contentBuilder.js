$.extend( true, pw, {
	util: {
		createColorlabel : function ( tag, group, value, text, classname, style ) {
			text  = text  || value;
			style = style || '';
			classname = classname || '';
			var html = '<' + tag + ' class="cc cl c-' + group + '-' + value + ' cl-badge ' + classname + '" style="' + style + '">' + text + '</' + tag + '>';
			return html;
		},
		createArticleTable : function ( tbody ) {
			return $('<table class="colortable colortable-colsep-0 colortable-rowsep-1 colorize ablock-full articletable articletable-hover ">' + tbody +'</table>');
		},
		createMsgBox : function ( image, text, classname ) {
			return '<table class="mbox colorbox ' + (classname||'') + '"><tbody><tr>' +
				'<th class="mbox-bar"></th>' +
				'<td class="mbox-image colorbox-image">' + image + '</td>' +
				'<td class="mbox-text">' + text + '</td>' +
				'</tr></tbody></table>';
		},
	}
});