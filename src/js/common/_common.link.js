if ( mw.config.get('wgUserId') ) {
	mw.util.addPortletLink(
		'p-personal',
		mw.util.getUrl( '用户:' + mw.config.get('wgUserName') + '/沙盒' ),
		'沙盒',
		'pt-mysandbox',
		'您的沙盒',
		null,
		'#pt-preferences'
	);
	
	mw.util.addPortletLink(
		'p-personal',
		mw.util.getUrl( '特殊:前缀索引/用户:' + mw.config.get('wgUserName') + '/', { stripprefix: 1 } ),
		'子页',
		'pt-mysubpages',
		'您的子页',
		null,
		'#pt-preferences'
	);
	
	if ( mw.config.get('wgIsArticle') ) {
		mw.util.addPortletLink( 'p-cactions', mw.util.getUrl( null, { action: "purge" } ), '刷新缓存' );
		mw.util.addPortletLink( 'p-cactions', mw.util.getUrl( '特殊:前缀索引/' + mw.config.get('wgPageName') + '/' ), '搜索子页' );
	
	  $( mw.util.addPortletLink( 'p-cactions', '#' , '操作', 'ca-action' ) ).click( function( e ) {
	    pw.loader.using( 'jqueryui', function () {
	      if ( $('#actiondialog').length == 0 ) {
		      var html = '<div id="actiondialog" title="针对页面《' + mw.config.get('wgPageName') + '》的操作">'
		      	+ '<fieldset>'
		      	+ '<legend>请选择操作类型：</legend>'
		      	+ '<label>修改<input type="radio" name="id-action" value="修改"></label>'
		      	+ '<label>删除<input type="radio" name="id-action" value="删除"></label>'
		      	+ '<label>改名<input type="radio" name="id-action" value="移动"></label>'
		      	+ '<label>保护<input type="radio" name="id-action" value="保护"></label>'
		      	+ '<label>上传<input type="radio" name="id-action" value="上传"></label>'
		      	+ '<label>举报<input type="radio" name="id-action" value="举报"></label>'
		      	+ '</fieldset>'
		      	+ '<fieldset>'
		      	+ '<legend>请输入操作理由：</legend>'
		      	+ '<input type="text" style="width:400px;" value="" class="text ui-widget-content ui-corner-all id-reason">'
		      	+ '</fieldset>'
		      	+ '</div>'
		      ;
	        $('body').append(html);
	        $('.id-reason').focus();
			    $( "input[name=id-action]" ).checkboxradio({
			      icon: false
			    });
		      var dialog = $( '#actiondialog' ).dialog({
		        resizable: false,
		        modal: true,
		        width: "auto",
		        buttons: {
		        	"确定": function(){
		        		var reason = $('.id-reason').val().trim();
		        		var action = $('input[name=id-action]:checked').val();
		        		if ( !action || reason.length == 0 ) {
		        			$('.id-reason').focus();
		        		} else {
		          		dialog.dialog( "close" );
		          		var pagename = "口袋百科讨论:文章操作讨论";
		          		var data = {
										title: pagename,
										section:'new',
										text: '{{Acttalk|' + action + '|' + mw.config.get('wgPageName') + '}}：' + reason + ' --~~~~'
									};
									var success = function(){ window.location.href = mw.util.getUrl(pagename); }
									var fail = function(){ alert('操作失败，请重试。'); }
		          		pw.action.edit( data,success,fail );
		        		}
		        	},
		        	"取消": function() {
		          	dialog.dialog( "close" );
		        	}
		      	},
		      });
	      }
	      $( '#actiondialog' ).dialog( "open" );
	    });
	  });
		
	}

}