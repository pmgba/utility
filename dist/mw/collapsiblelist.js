pw.widgets.collapsiblelist=function(){$(".js-collapsiblelist").each(function(){var a=$(this),b=a.nextAll("ol,ul,dl"),c="["+(a.data("show")||"展开")+"]",d="["+(a.data("hide")||"折叠")+"]",e=$('<a class="collapsiblelist-toggle" href="#" style="font-size:xx-small;">'+c+"</a>");a.html(e),b.hide();var f=!1;e.click(function(){return f?(b.hide(),e.html(c)):(b.show(),e.html(d)),f=!f,!1})})};