if ( mw.config.get('wgIsArticle') && (mw.config.get('wgNamespaceNumber')%2==0) && mw.config.get('wgPageName') != mw.config.get('wgMainPageTitle') ) {


comment = {
	archivePage : '口袋百科:页面留言',
	
	talkPage : function(){
		var talkpage = $('#ca-talk a').attr('href');
		talkpage = $('#ca-talk').hasClass('new') ? /=(.+?)&/.exec(talkpage)[1] : talkpage.replace('/wiki/','');
		talkpage = decodeURIComponent(talkpage).replace('%20','+');
		return talkpage;
	}(),
	
	createCommentBox : function() {
		var html = '<div class="pw-comment">';
		html += '<h2><a href="/wiki/'+ comment.talkPage +'">留言</a></h2>';
		if ( mw.config.get('wgUserName') ) {
			html += '<table>'
				+ '<tr><td><textarea class="pw-comment__text" placeholder="请输入内容"></textarea></td></tr>'
				+ '<tr><td class="pw-comment__buttons">'
				+ '<input class="pw-comment__submit" type="button" value="发布" onclick="comment.post();" />'
				+ '</td></tr>'
				+ '</table>'
			;
		} else {
			var loginUrl = mw.util.getUrl('特殊:用户登录', { returnto: mw.config.get('wgPageName')} );
			html += '<table><tr><td><a href="' + loginUrl + '">登录</a>之后，您可以在这里留言。</td></tr></table>';
		}
		html += '</div>';
		$('div#footer').before( html );
		$('.pw-comment__buttons').hide();
		$('.pw-comment__text').focus(function() {
			$(this).addClass('focus');
			$('.pw-comment__buttons').show();
		}).blur(function() {
			if ( this.value.length == 0 ) {
				$(this).removeClass('focus');
				$('.pw-comment__buttons').hide();
			}
		});
		mw.util.addCSS( ''
			+ '.pw-comment { margin: 1em 0 0 11em; padding: 0 1em 1em; font-size:1em; background-color: white; border: 1px solid #A7D7F9; border-right: 0; }'
			+ '.pw-comment h2 { font-size: 1.2em; }'
			+ '.pw-comment table { width: 100%; border-collapse: collapse; }'
			+ '.pw-comment__text { width: 100%; height: 22px; resize: vertical; }'
			+ '.pw-comment__text:focus { height: 54px; }'
			+ '.pw-comment__buttons { text-align:right; }'
		);
	},
	
	post : function() {
		var text = $('.pw-comment__text').val().trim();
		if ( text.length == 0 ) return;
		$( ".pw-comment *" ).prop( "disabled", true );
		
		text = text.replace(/^[\n\r ]+|[\n\r ]+$/g,'');
		text = text.replace(/\n +/g,'\n');
		var now = new Date(), time = now.getFullYear()+'年'+(now.getMonth() + 1)+'月'+now.getDate()+'日';
		var textToArchive = '* ' + time + '，' + mw.config.get('wgUserName')+ '在[[' + mw.config.get('wgPageName') + ']]说：“' + text + '”';
		var textToTalk = '=={{Newmsg|'+mw.config.get('wgUserName')+'|'+time+'}}==\n' + text;
		if ( textToTalk.indexOf( mw.config.get('mw.msg.wikieditor') )==-1 ) { textToTalk += mw.config.get('mw.msg.wikieditor') }

		pw.action.edit( {
			title : comment.archivePage,
			section:'new',
			text: textToArchive
		});
		
		pw.action.edit( {
			title: comment.talkPage,
			section:'new',
			text: textToTalk
		},
		function() {
			window.location.href = mw.util.getUrl( comment.talkpageName );
		},
		function() {
			alert( '发送失败，请重试。' );
			$( ".pw-comment *" ).prop( "disabled", false );
		});
	}
}

comment.createCommentBox();

}