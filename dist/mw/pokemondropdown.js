pw.loader.using(["pokemon.js"],function(){var a="";a+="<select>";for(var b=1;b<=pw.info.maxPokemonCount;b++)a+='<option value="'+b+'">#'+String("00").concat(b).slice(-3)+" "+pw.util.getPokemonName(b)+"</option>";a+="</select>";var c=$(a),d=$(".pokemondropdown");c.val(parseInt(d.data("index"),10));var e=d.data("format");c.change(function(){var a=e.replace("{number}",String("00").concat($(this).val()).slice(-3));location.href=mw.util.getUrl(a)}),d.append(c)});