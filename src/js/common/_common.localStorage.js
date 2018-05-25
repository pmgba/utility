pw.localStorage = {
	prefix : 'pw-',
	
  get : function ( key, def ) {
    var raw = localStorage.getItem( pw.localStorage.prefix + key );
    if ( raw === null ) return def;
    try {
      var obj = JSON.parse(raw);
      if ( typeof obj === 'object' && typeof obj.data !== 'undefined' ) return obj.data;
    } catch (e) {
    }
    return def;
  },
  
  set : function ( key, value ) {
    var obj = {
    	"data": value,
    	"time": Date.now()
    };
    localStorage.setItem( pw.localStorage.prefix + key, JSON.stringify( obj ));
  },
  
  remove : function ( key ) {
    localStorage.removeItem( pw.localStorage.prefix + key );
  }
  
};