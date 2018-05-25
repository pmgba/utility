poketoruBoard = {

	defaultIconWidth : '32px',

	iconSrc : {
		'block' : '/w/images/6/6f/Shuffle_Block.png',
		'rock' : '/w/images/b/bc/Shuffle_Rock.png',
		'barrier' : '/w/images/d/d9/Shuffle_Barrier.png',
		'cloud' : '/w/images/9/9f/Shuffle_Cloud.png',
		'coin' : '/w/images/a/a8/Shuffle_Coin.png',
		'clear' : '/w/images/a/a5/Shuffle_Clearing.png',
		'a' : '/w/images/b/b1/Shuffle_Icon_A.png',
		'b' : '/w/images/a/a8/Shuffle_Icon_B.png',
		'c' : '/w/images/2/28/Shuffle_Icon_C.png',
		'd' : '/w/images/7/7c/Shuffle_Icon_D.png',
		'e' : '/w/images/4/49/Shuffle_Icon_E.png'
	},

	arrowSvg: '<svg width="{w}px" height="{h}px" style="position: absolute; top: 0; left: 0;"><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,1 L0,5 L6,3 z" fill="#f00" /></marker></defs><line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#f00" stroke-width="4" marker-end="url(#arrow)" /></svg>',

	coverIcons : [ 'barrier', 'cloud', 'clear', 'area', 'drag', 'drop', 'switch' ],

	createIcon : function ( key, iconWidth ) {
		key = key.toLowerCase();
		var img = '';
		var src = '';
		if ( key in poketoruBoard.iconSrc ) {
			src = poketoruBoard.iconSrc[key];
		} else if ( key.length == 1 ) {
			var f = ('0' + (key.charCodeAt()-'a'.charCodeAt())).slice(-2);
			src = pw.util.getResUrl('/sprites/side/shuffle/pokemon/201.'+f+'.png');
		} else {
			var s = key.split('.');
			var n = ('00' + s[0]).slice(-3);
			var f = ( s.length == 1 ) ?  '00' : ('0' + s[1]).slice(-2);
			src = pw.util.getResUrl('/sprites/side/shuffle/pokemon/'+n+'.'+f+'.png');
		}
		if ( src ) {
			img = '<img class="shuffleboard-'+key+'" src="'+src+'" style="width:'+iconWidth+';height:'+iconWidth+';"/>';
			return img;
		} else {
			return '<div class="shuffleboard-'+key+'" style="width:'+iconWidth+';height:'+iconWidth+';"/>';
		}
	},

	createBoard : function ( boardData, iconWidth, isFullLayout ) {
		var dataRowLength = ( ( boardData[0].length < 6 ) ? 6 : boardData[0].length );
		var displayRowOffset = dataRowLength - 6;
		var iconWidth2 = parseInt(iconWidth.replace('px',''),10);

		var iconList = new Array(dataRowLength);
		for ( var x = 0; x < dataRowLength; x++ ) {
			iconList[x] = new Array(6);
			for ( var y = 0; y < 6; y++ ) {
				iconList[x][y] = [];
				if ( boardData[0].length >= x && !!boardData[0][x] ) {
					var cellData = boardData[0][x][y].trim().toLowerCase();
					if ( cellData.length > 0 ) iconList[x][y] = cellData.split(',');
				}
			}
		}
		if ( boardData.length == 2 ) {
			for ( var x = 0; x < boardData[1].length; x++ ) {
				for ( var y = 0; y < 6; y++ ) {
					var cellData = boardData[1][x][y].trim().toLowerCase();
					if ( cellData.length > 0 ) iconList[x+displayRowOffset][y].push(cellData);
				}
			}
		}
		var tableHtml = '';
		tableHtml += '<div class="shuffleboard-wrapper"><table>';
		var arrowX1,arrowY1,arrowX2,arrowY2;
		for ( var x = ( isFullLayout ? 0 : displayRowOffset ); x < dataRowLength; x++ ) {
			tableHtml += '<tr>';
			for ( var y=0; y<6; y++ ) {
				var isEmpty = iconList[x][y].length == 0 || $.inArray( iconList[x][y][0], poketoruBoard.coverIcons ) > -1;
				tableHtml += '<td><div class="' + (isEmpty?'shuffleboard-empty':'') +'" style="width:'+iconWidth+';height:'+iconWidth+';">';
				for ( var i = 0; i < iconList[x][y].length; i++ ) {
					var iconKey = iconList[x][y][i];
					if ( iconKey == 'area' ) {
						var areaClass = '';
						if ( x == dataRowLength - 1 || $.inArray( 'area', iconList[x+1][y]) == -1 ) areaClass += 'shuffleboard-area-bottom ';
						if ( x == 0 || $.inArray( 'area', iconList[x-1][y]) == -1 ) areaClass += 'shuffleboard-area-top ';
						if ( y == 6 - 1 || $.inArray( 'area', iconList[x][y+1]) == -1 ) areaClass += 'shuffleboard-area-right ';
						if ( y == 0 || $.inArray( 'area', iconList[x][y-1]) == -1 ) areaClass += 'shuffleboard-area-left ';
						tableHtml += '<div class="shuffleboard-area '+areaClass+'" style="width:'+iconWidth+';height:'+iconWidth+';"/>';
					} else if ( iconKey == 'drag' || iconKey == 'drop' || iconKey == 'switch' ) {
						tableHtml += '<div class="shuffleboard-area shuffleboard-'+iconKey +'" style="width:'+iconWidth+';height:'+iconWidth+';"/>';
						if ( iconKey == 'drag' ) {
							arrowX1 = ( y + 0.5 ) * ( iconWidth2 + 1 )+3;
							arrowY1 = ( x + 0.5 ) * ( iconWidth2 + 1 );
						} else if ( iconKey == 'drop' ) {
							arrowX2 = ( y + 0.5 ) * ( iconWidth2 + 1 )+3;
							arrowY2 = ( x + 0.5 ) * ( iconWidth2 + 1 );
						}
					} else {
						tableHtml += poketoruBoard.createIcon( iconKey, iconWidth );
					}
				}
				tableHtml += '</div></td>';
			}
			tableHtml += '</tr>';
			if ( isFullLayout && x == displayRowOffset - 1 ) tableHtml += '<tr><td colspan="6"><hr></td></tr>';
		}
		tableHtml += '</table>';
		if ( arrowX1 && arrowY1 && arrowX2 && arrowY2 ) {
			tableHtml += poketoruBoard.arrowSvg.replace('{w}',( iconWidth2 + 1 )*6).replace('{h}',( iconWidth2 + 1 )*6).replace('{x1}',arrowX1).replace('{y1}',arrowY1).replace('{x2}',arrowX2).replace('{y2}',arrowY2);
		}
		tableHtml += '</div>';
		$table = $(tableHtml);
		return $table;
	},

	init : function() {
		mw.util.addCSS( ''
+ '		.shuffleboard-wrapper { border: 1px solid #ccc; border-radius: 0.5em; overflow: hidden; display: inline-block; margin:auto; }'
+ '		.shuffleboard-wrapper table { border-collapse:collapse; }'
+ '		.shuffleboard-wrapper td { border: 1px solid #f2f2f2; padding: 0; background: none; }'
+ '		.shuffleboard-wrapper div { text-align: left; }'
+ '		.shuffleboard-wrapper img { position: absolute; width: 100%; height: 100%; }'
+ '		.shuffleboard-expand { text-align: center; cursor: pointer; font-size:small; }'
+ '		.shuffleboard:hover .shuffleboard-cloud { opacity:0.5; filter:alpha(opacity=50); }'
+ '		.shuffleboard-drag { background-color: #faa; }'
+ '		.shuffleboard-drop { background-color: #aaf; }'
+ '		.shuffleboard-switch { background-color: #afa; }'
+ '		.shuffleboard-area-top { border-top: 1px red dashed; }'
+ '		.shuffleboard-area-bottom { border-bottom: 1px red dashed; }'
+ '		.shuffleboard-area-left { border-left: 1px red dashed; }'
+ '		.shuffleboard-area-right { border-right: 1px red dashed; }'
+ '		.shuffleboard-empty { background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTAwMTZFREJBNTU4MTFFNTk5MTJDRDdDM0M3QzE3MjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTAwMTZFRENBNTU4MTFFNTk5MTJDRDdDM0M3QzE3MjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDAxNkVEOUE1NTgxMUU1OTkxMkNEN0MzQzdDMTcyNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDAxNkVEQUE1NTgxMUU1OTkxMkNEN0MzQzdDMTcyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj+Z5DwAAAOtSURBVHja7JZbSJNhGMefzc0dc56m4gGmbPMETgQ1B9EUBVM2l5heBBoEdmOXdRd0nXWXKHgThHiTkU0bXWWCmCBOEQ+tTTfPTtRtbnM6D/3fYdcGXyDEPhD127f3/T3/5//83493eXlJN3nx6YavGEAMIAYguO6B4eFhOj09JYFAQMnJyRQXF0der1d7eHioOj4+Vp6cnPDOz889xcXFLtyz22w2CgaD1N7ezp6j2tpabgDsOjs7I7lcziDUExMTTVtbW7cSExNJJBKRRCKhcDisHhkZ0efl5fl1Ot3H9fV1F4Pm8XjcFVAoFCSTyQiVlg0ODpqkUinp9frvUMKWmprqxX0KhUKJBQUFpXNzcwa32/3IaDR+vri4mGGfcfZAf38/qz5zbGzMlJCQEDKZTG9ycnK+ORwObyAQiMoMAC9gxgD2Gs/6oIYJquT+jQLXAkBW/vj4+EOxWExms7kHmx2hFeKkpCQz2vFyYWHhBVpx3263i/r6+gLoeS9rz+TkZFtKSgqPM0BdXZ1md3dXptFoLKgqmJaWJsTiXVNTU6WACsIDYavVqvN4PF0tLS2Co6OjsEql+uT3+8XwSj5nAEitYdUrlcptVKpYWlpqmZ2dlXd0dFhLSkq6fT5fd2tr69eVlZVb+PwBABVolYeZdm1tTc3ZhFhUtLq6SpFIpJONIDYirVbLNpiqrKwkwLBJmIT7dQMDA/nsggFpZ2eHsrKy4jkDwGg8lgFsrJgSV3lwubi4SGwiysrKCP2P5gP7YRcDiI+Pp4ODgzjOANgwBNdTU1PTO/x7uLy8fA8eKEhPT7+NDX5kZGTQ3t5exczMTEZzc/NPtOALPJOALHiMl50QZ4Dc3FwH+l6BKlOEQqELsg7BkE8BUQ+Z7yAFyeVyyZCEAUB9wFciUEsNCGpsbPz1L84CB2Y8PD8/b4QR5fBDpKampgcb2gAlQYsk5eXltuzs7LeYhAieEQPICGVOMRGO6xbnXfdOODo6Sqg8E7874e5AVVVVL9zNxo+ZMeoJtsb09DShVVKcBU8AokD17xFEzvr6em4KbG5uEkZtq6GhYRg5IIf0z7a3tw1FRUXJgKGruMVQyO8isJ7j3FBUV1db9vf3nX9MyckDzNFsIchtQ9QeoLo2p9NpwClpQBJGAVgkA44QQH5UPYS/3VCNEETcARCnxOfzo4cS1HDDaK8KCwu1gFBtbGwo0RY+oteDe6uIZbvFYmGRHf0eg+DsgdgrWQwgBvDfA/wWYAANy8993yhYoAAAAABJRU5ErkJggg==\') center center no-repeat; background-size: 100% 100%; }'
+ '		#shuffleboard-dialog { max-height: 800px; }'
		);
		
		$('.shuffleboard').each(function(){
			var $this = $(this);
			if ( ! $this.data('default') ) { return true; }
			var iconWidth = ( $this.data('iconwidth') && $this.data('iconwidth').match(/^\d+px$/i) ) ? $this.data('iconwidth') : poketoruBoard.defaultIconWidth;
			
			try {
				var defaultBoard = $.parseJSON( '[' + $this.data('default').replace(/'/g,'"') + ']' );
			} catch(e) {
				return true;
			}
			var $table = poketoruBoard.createBoard( defaultBoard, iconWidth,  false );
			$this.html($table);
			if ( defaultBoard[0].length > 6 ) {
				var $expand = $('<div class="shuffleboard-expand">展开</div>');
				$expand.click(function(){
					pw.loader.using( 'jqueryui', function () {
						if ( $('#shuffleboard-dialog').length == 0 ) {
							$('body').append('<div id="shuffleboard-dialog" title="完整布局"></div>');
						}
						var $dialog = $( '#shuffleboard-dialog' );
						$dialog.html( poketoruBoard.createBoard(defaultBoard,iconWidth,true) );
						$dialog.dialog({
							width: 300,
							modal: true,
							height: "auto"
						});
						$dialog.scrollTop($dialog.prop("scrollHeight"));
					});
				});
				$this.append($expand);
			}
			$this.addClass('shuffleboard-done');
		});

	}
};

poketoruBoard.init();
