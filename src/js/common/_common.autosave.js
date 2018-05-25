pw.autosave = {
	
	listKey : 'autosaveList',
	draftPrefix : 'autosave-',
	draftList : {},
	specialpageName : '特殊:草稿',
	
	getDraftKey: function ( title ) {
		return pw.autosave.draftPrefix + title;
	},
	
	removeDraft: function ( title ) {
		var key = pw.autosave.getDraftKey(title);
		delete pw.autosave.draftList[title];
		pw.localStorage.remove(key);
		pw.localStorage.set( pw.autosave.listKey, pw.autosave.draftList );
	},
	
	init : function() {
		pw.autosave.draftList = pw.localStorage.get( pw.autosave.listKey, {} );
		var pagename = mw.config.get( 'wgPageName' );
		if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {
			//autosave.generateAutosave();
		} else if ( mw.config.get( 'wgPageName' ) === pw.autosave.specialpageName ) {
			pw.loader.using( 'specialpage.autosave.js' );
		} else if ( mw.config.get( 'wgAction' ) === 'view' && pagename in pw.autosave.draftList ) {
			mw.hook('postEdit').add( function(){
				pw.autosave.removeDraft(pagename);
				mw.notify('发布成功，保存的草稿已删除。');
			});
		}
		
		mw.util.addPortletLink(
			'p-personal',
			mw.util.getUrl( '特殊:草稿' ),
			'草稿(' + Object.keys(pw.autosave.draftList).length + ')',
			'pt-autosave',
			'你的草稿',
			null,
			'#pt-preferences'
		);
		
	}
};