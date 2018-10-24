// 对[[特殊:最近更改]]与[[特殊:日志]]重新排版并添加颜色样式。
(function(){
	
		mw.util.addCSS( ''
+ '.rcrow { width:100%; border-collapse: collapse; white-space: nowrap; }'
+ '.rcrow-action { width:40px; text-align:center; }'
+ '.rcrow-time { width:50px; }'
+ '.rcrow-log { width:40%; }'
+ '.rcrow-comment { display: inline-block; width: 400px; overflow: hidden; text-overflow: ellipsis; }'
+ '.rcrow-user { width:110px; }'
+ '.special { list-style-image : none; list-style-type : none; margin-left : 0; }'
+ '.mw-logline { background : #F3F3F3; border : 1px solid #E6E6E6;border-left-width: 4px; border-radius : 0.35em; margin : 0.3em 0;}'
+ '.mw-logline-edit { background   : #f2f8ff; border-color : #A3D3FF;}'
+ '.mw-logline-newpage {	background   : #D8ECFF;	border-color : #70bbff;}'
+ '.mw-logline-newusers {	background   : #ddffbb;	border-color : #88aa66;}'
+ '.mw-logline-upload {	background   : #e8d4ff;	border-color : #b26eff;}'
+ '.mw-logline-move {	background   : #ffebd8;	border-color : #ffc487;}'
+ '.mw-logline-delete {	background   : #ffd4d4;	border-color : #ff5555;}'
+ '.mw-logline-protect {	background   : #dedde2;	border-color : #bbc4d3;}'
		);
		
function createtable(log, flag, title, time, byte, user, comment) {
	var table = '';
	table += '<table class="rcrow">';
	table += '<tr>';
	table += '<td class="rcrow-action">' + log + '</td>';
	table += '<td class="rcrow-time">' + time + '</td>';
	//table += '<td class="rcrow-action">' + flag + '</td>';
	table += '<td class="rcrow-log">' + flag + title + '  ' + byte + '</td>';
	table += '<td class="rcrow-user">' + user + '</td>';
	table += '<td class="rcrow-comment">' + comment + '</td>';
	table += '</tr></table>';
	return table;
}

function getOuterHTML( $j ) {
	if ( $j.length > 0 ) {
		var h = '';
		$.each($j, function(i,v){
			h += v.outerHTML;
		});   
		return h;
	} else {
		return '';
	}
}

$('.special li:not(.mw-logline)').each( function () {
	var $this = $(this);
	$this.addClass('mw-logline');
	var html = $this.html();
	var act = $this.text().match(/^（(.+?)）/)[1];
	var log = html.match(/^（(.+?a>)）/)[1];

	var title = '';
	var date = getOuterHTML($('.mw-changeslist-date',$this));
	var plusminus = getOuterHTML($('.mw-plusminus-pos, .mw-plusminus-neg, .mw-plusminus-null',$this));
	var userlink = getOuterHTML($('.mw-userlink:last',$this));
	//var usertoollinks = getOuterHTML($('.mw-usertoollinks:last',$this));
	var comment = getOuterHTML($('.comment',$this));
	var rollback = getOuterHTML($('.mw-rollback-link',$this));
	var abbr = getOuterHTML($('abbr',$this));

	if ( act == '差异 | 历史' ) {
		act = '编辑';
		$this.addClass('mw-logline-edit');
		if ( $('.newpage',$this).length > 0 ) {
			$this.addClass('mw-logline-newpage');
			act = '新建';
		}
		if ( log.indexOf('diff=') > -1 ) plusminus = log.match(/(<a.+?>)差异<\/a>/)[1] + plusminus +'</a>';
		log = log.match(/(?:<a.+?)*(<a.+?>)历史<\/a>/)[1] + act + '</a>';
		title = getOuterHTML($('.mw-title',$this));
	} else if ( act == '用户创建日志' ) {
		log = log.replace( act, '用户' );
		title = '创建账户';
		$this.addClass('mw-logline-newusers');
	} else if ( act == '用户权限日志' ) {
		log = log.replace( act, '用户' );
		title = html.match(/将.+‎/)[0];
		$this.addClass('mw-logline-newusers');
	} else if ( act == '上传日志' ) {
		log = log.replace( act, '上传' );
		var m = html.match(/上传(<a(.+?)a>)(的新版本)*/);
		title = m[1];
		if ( m[2] ) title = '<abbr class="newpage" title="该编辑创建了新页面">新</abbr>' + title;
		$this.addClass('mw-logline-upload');
	} else if ( act == '移动日志' ) {
		log = log.replace( act, '移动' );
		title = html.match(/移动页面<a(.+?)a>至<a(.+?)a>/)[0];
		$this.addClass('mw-logline-move');
	} else if ( act == '删除日志' ) {
		log = log.replace( act, '删除' );
		title = html.match(/(..)页面<a(.+?)a>( <span.+?span>)*/)[0];
		$this.addClass('mw-logline-delete');
	} else if ( act == '保护日志' ) {
		log = log.replace( act, '保护' );
		title = html.match(/(保护了|解除了)<a(.+?)a>/)[0];
		$this.addClass('mw-logline-protect');
	} else if ( act == '封禁日志' ) {
		log = log.replace( act, '封禁' );
		title = html.match(/(封禁了|解封了)<a(.+)‎/)[0];
		$this.addClass('mw-logline-protect');
		userlink = getOuterHTML($('.mw-userlink:first',$this));
	}
	$this.html(createtable(log, abbr, title , date, plusminus, userlink, comment));
});

})();