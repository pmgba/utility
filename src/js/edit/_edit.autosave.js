(function() {
	var countdown = -1;
	var timer;
	var draftTitle = mw.config.get( 'wgPageName' );
	var draftKey = pw.autosave.getDraftKey(draftTitle);
	var isCountingDown = false;
	var isChanged = false;
		
	var $wpTextbox1 = $('#wpTextbox1');
	$wpTextbox1.change(function() {
		isChanged = true;
		if ( !isCountingDown ) startCountdown();
	});
	
	var savedDraft = pw.localStorage.get( draftKey );
	if ( savedDraft != null ) $('.pw-autosave__load').show();
	
	function startCountdown() {
		if ( !isChanged ) return;
		if ( $wpTextbox1.val().trim().length === 0 ) return;
		isCountingDown = true;
		$('.pw-autosave__savenow').show();
		countdown = 30;
		timer = setInterval( checkAutosaveCountdown, 1000 );
	};
	function stopCountdown() {
		$('.pw-autosave__savenow').hide();
		clearInterval( timer );
		isCountingDown = false;
	};
	
	function checkAutosaveCountdown() {
		countdown -= 1;
		$('.pw-autosave__countdown').html( countdown + '秒后自动保存。' );
		if ( countdown <= 0 ) saveDraft();
	};
	
	function saveDraft() {
		if ( !isChanged ) return;
		savedDraft = $wpTextbox1.val();
		pw.autosave.draftList[draftTitle] = { time: mw.now(), length: savedDraft.length };
		pw.localStorage.set( draftKey, savedDraft );
		pw.localStorage.set( pw.autosave.listKey, pw.autosave.draftList );
		$('.pw-autosave__countdown').html( '已保存草稿。' );
		stopCountdown();
		isChanged = false;
	};
	
	$('input#wpSave, input#wpPreview, input#wpDiff').click( function() { saveDraft(); } );
	
	pw.loader.using( 'font-awesome', function(){
		var html = pw.util.createMsgBox(
			'<i class="fa fa-fw fa-save"></i>',
				'<div>自动保存功能已经启动，每30秒会自动将您未发布的文章保存至本地浏览器。</div><div style="font-size:small;">'+
					'\n<a class="pw-autosave__load" href="#">[载入草稿]</a>'+
					'\n<a class="pw-autosave__savenow" href="#">[马上保存]</a>'+
					'\n<span class="pw-autosave__countdown"></span>' +
				'</div>',
			'pw-autosave'
		);
		$('.editOptions').after(html);
		$('.pw-autosave__savenow').hide();
		$('.pw-autosave__load').toggle( savedDraft != null );
		$('.pw-autosave__load').click(function() { 
			$('.pw-autosave__countdown').html( '已载入草稿。' );
			isChanged = false;
			stopCountdown();
			$wpTextbox1.val(savedDraft);
			return false;
		});
		$('.pw-autosave__savenow').click(function() { saveDraft();return false; });
		
	});
	
})();

/*
	$('.editOptions').append('\n<input id="wpAutosave" name="wpAutosave" value="自动保存" title="自动保存至缓存" type="button" disabled=true >'+
		'\n<input id="wpLoadAutosave" name="wpLoadAutosave" value="载入草稿" title="载入自动保存的草稿" type="button" disabled=true >');
	var $wpAutosave = $('#wpAutosave');
	var $wpLoadAutosave = $('#wpLoadAutosave'); 

		$wpLoadAutosave.removeAttr('disabled');   
		$wpLoadAutosave.val('载入草稿');
	$wpLoadAutosave
*/