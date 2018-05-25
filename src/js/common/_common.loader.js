pw.loader = {
 
  _scriptList : {},
	
  _moduleList : {
    'bootstrap' : [
      '//cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css',
      '//cdn.bootcss.com/bootstrap/4.1.0/js/bootstrap.min.js'
    ],
    'jqueryui' : [
      '//cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.css',
      '//cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js'
    ],
    'webui-popover' : [
      '//cdn.bootcss.com/webui-popover/1.2.18/jquery.webui-popover.min.css',
      '//cdn.bootcss.com/webui-popover/1.2.18/jquery.webui-popover.min.js'
    ],
    'katex' : [
      '//cdn.bootcss.com/KaTeX/0.8.3/katex.min.css',
      '//cdn.bootcss.com/KaTeX/0.8.3/katex.min.js'
    ],
    'chart' : [
      '//cdn.bootcss.com/Chart.js/2.7.0/Chart.min.js'
    ],
    'flag' : [
      '//cdn.bootcss.com/flag-icon-css/2.8.0/css/flag-icon.min.css'
    ],
    'font-awesome' : [
      '//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
    ],
    'ionicons' : [
      '//cdn.bootcss.com/ionicons/2.0.1/css/ionicons.min.css'
    ],
  },
  
  using: function( scripts, callback ) {
    if ( !Array.isArray(scripts) ) scripts = [scripts];

    var urlToLoad = [];
     
    $.each( scripts, function( i, scriptName ) {
      var urlList = pw.loader._moduleList[scriptName] || [scriptName];
      
      for ( var j in urlList ) {
      	//var url = pw.loader._temporarySolution[ urlList[j].toLowerCase() ] || urlList[j];
      	var url = urlList[j];
      	
        if ( false ) {
        } else if ( url.match(/^MediaWiki:.+\.js$/i) ) {
          //url = '/w/index.php?action=raw&ctype=text/javascript&maxage=2419200&smaxage=2419200&title=' + url;
          url = pw.config.get('pwScriptPath') + url.slice(10).toLowerCase();
        } else if ( url.match(/^MediaWiki:.+\.css$/i) ) {
          //url = '/w/index.php?action=raw&ctype=text/css&maxage=2419200&smaxage=2419200&title=' + url;
        } else if ( url.match(/^(http:\/\/|https:\/\/|\/\/)/i) ) {
        } else {
          url = pw.config.get('pwScriptPath') + url.toLowerCase();
        }
        if ( ! ( url in pw.loader._scriptList ) ) {
        	pw.loader._scriptList[ url ] = false;
        	urlToLoad.push( url );
        }
      }
    });

		if ( urlToLoad.length > 0 ) {
      loadjs( urlToLoad, { success: function() {
      	for ( var scriptName in pw.loader._scriptList ) pw.loader._scriptList[scriptName] = true;
      	if ( callback ) callback();
      } } );
  	} else {
      if ( callback ) callback();
  	}
  },
  
};