window.pw = window.pokeWiki = {

  config : {
    values: {
      pwResPath : 'http://res.pokemon.name/',
      pwScriptPath : 'http://static.pokemon.name/utility/dist/mw/',
      pwLanguage : 'zh-cn',
      isMediaWiki : function(){ return typeof mw !== typeof undefined; }(),
      isMobile : function(){ return !!mw.config.get('wgMFMode'); }(),
    },
    get : function( key, defaultValue ) {
      return pokeWiki.config.values[key] || defaultValue || '';
    },
    set: function( key, value ) {
      pokeWiki.config.values[key] = value;
    }
  },

  util : {
  },

  action : {
    edit : function( opt, callbackSuccess, callbackError ) {
      var data = {
        format: 'json',
        action: 'edit',
        token: mw.user.tokens.get( 'editToken' )
      };
      $.extend( true, data, opt );
      $.ajax({
        url: mw.util.wikiScript( 'api' ),
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function( data ) {
          if ( data && data.edit && data.edit.result === 'Success' ) {
            if (callbackSuccess) callbackSuccess();
          } else {
            if (callbackError) callbackError();
          }
        },
        error: callbackError
      });
    },
  },
  
};
