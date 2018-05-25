var bds_config={"snsKey":{'tsina':'3152691230','tqq':'801088949','t163':'032eeUNgibgD95Zp','tsohu':''}};
(function() {
	var share_html = '<h3>分享到</h3><div class="body"><ul>';
	share_html += '<li><div id="bdshare" class="bdshare_t bds_tools get-codes-bdshare">';
	share_html += '<a class="bds_tsina">新浪微博</a><br />';
	share_html += '<a class="bds_tqq">腾讯微博</a><br />';
	share_html += '<a class="bds_qzone">QQ空间</a><br />';
	share_html += '<a class="bds_renren">人人网</a><br />';
	share_html += '<a class="bds_copy">复制网址</a>';
	share_html += '<span class="bds_more">更多</span><a class="shareCount"></a>';
	share_html += '</div><div style="clear:both;"></div></li>';
	share_html += '</ul></div>';
	if ( $('#p-SHARE').length == 0 ) {
		$('#mw-panel').append('<div class="portal" role="navigation" id="p-SHARE" aria-labelledby="p-SHARE-label"></div>');
	}
	$('#p-SHARE').html( share_html );
	$('#bdshare > span').css('clear','left').prevAll().css('clear','both');

	var bdshare_js = document.createElement("script");
	bdshare_js.type = "text/javascript";
	bdshare_js.id = "bdshare_js";
	document.getElementById("bdshare").appendChild(bdshare_js);
	document.getElementById("bdshare_js").setAttribute('data','type=tools&amp;uid=6532780');

	var bdshell_js = document.createElement("script");
	bdshell_js.type = "text/javascript";
	bdshell_js.id = "bdshell_js";
	bdshell_js.src = "http://share.baidu.com/static/js/shell_v2.js?t=" + Math.ceil(new Date()/3600000);
	document.getElementById("bdshare").appendChild(bdshell_js);
})();


if ( mw.config.get('wgIsArticle') && $('#bdlike').length == 0 ) {
	$('#p-namespaces ul').append('<li id="bdlike" style="width:0;"><div class="bdlikebutton" style="width:85px;margin:1em 0.3em 0 0.3em" ></div></li>');
	window.bdShare_config = {
		"type":"small",
		"color":"blue",
		"uid":"6532780"
	};
	var bdlike_shell = document.createElement("script");
	bdlike_shell.id = "bdlike_shell";
	bdlike_shell.type = "text/javascript";
	bdlike_shell.src = "http://bdimg.share.baidu.com/static/js/like_shell.js?t=" + Math.ceil(new Date()/3600000);
	document.getElementById("bdlike").appendChild(bdlike_shell);
}