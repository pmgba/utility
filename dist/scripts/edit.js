!function(e){var t={};function a(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=8)}({6:function(e,t,a){"use strict";!function(){var e,t=-1,a=mw.config.get("wgPageName"),n=pw.autosave.getDraftKey(a),o=!1,s=!1,r=$("#wpTextbox1");r.change(function(){s=!0,o||function(){if(!s)return;if(0===r.val().trim().length)return;o=!0,$(".pw-autosave__savenow").show(),t=30,e=setInterval(l,1e3)}()});var i=pw.localStorage.get(n);function u(){$(".pw-autosave__savenow").hide(),clearInterval(e),o=!1}function l(){t-=1,$(".pw-autosave__countdown").html(t+"秒后自动保存。"),t<=0&&p()}function p(){s&&(i=r.val(),pw.autosave.draftList[a]={time:mw.now(),length:i.length},pw.localStorage.set(n,i),pw.localStorage.set(pw.autosave.listKey,pw.autosave.draftList),$(".pw-autosave__countdown").html("已保存草稿。"),u(),s=!1)}null!=i&&$(".pw-autosave__load").show(),$("input#wpSave, input#wpPreview, input#wpDiff").click(function(){p()}),pw.loader.using("font-awesome",function(){var e=pw.util.createMsgBox('<i class="fa fa-fw fa-save"></i>','<div>自动保存功能已经启动，每30秒会自动将您未发布的文章保存至本地浏览器。</div><div style="font-size:small;">\n<a class="pw-autosave__load" href="#">[载入草稿]</a>\n<a class="pw-autosave__savenow" href="#">[马上保存]</a>\n<span class="pw-autosave__countdown"></span></div>',"pw-autosave");$(".editOptions").after(e),$(".pw-autosave__savenow").hide(),$(".pw-autosave__load").toggle(null!=i),$(".pw-autosave__load").click(function(){return $(".pw-autosave__countdown").html("已载入草稿。"),s=!1,u(),r.val(i),!1}),$(".pw-autosave__savenow").click(function(){return p(),!1})})}()},7:function(module,exports,__webpack_require__){"use strict";if(__webpack_require__(6),$("#wpTextbox1").keydown(function(e){if(9==e.keyCode){var t=this.selectionStart,a=this.selectionEnd,n=this.scrollTop,o=this.value.substring(t,a);if(o.match(/\n/))o=o.replace(/\n/g,"\n\t");else var s=t+(o="\t").length;this.value=this.value.substring(0,t)+o+this.value.substring(a,this.value.length),this.focus(),this.selectionStart=s||t,this.selectionEnd=t+o.length,this.scrollTop=n,e.preventDefault()}}),2==mw.config.get("wgNamespaceNumber")&&mw.config.get("wgRelevantUserName")!=mw.config.get("wgUserName")){var $wpSave=$("#wpSave");$wpSave.prop("disabled",!0);var warning='<div style="margin: 0.5em 0;"><span class="pw-editup__warning" style="font-weight:bold;">这个页面属于另一位用户所有，请在所有者的许可下进行编辑。</span><a class="pw-editup__confirm" href="#" >[我确定]</a></div>';$(".editButtons").after(warning),$(".pw-editup__confirm").click(function(){return $wpSave.prop("disabled",!1),$(this).hide(),!1})}!function(){$("#wpSummaryLabel .mw-summary-preset-item").each(function(){var e=$("<a></a>").attr("href","#").html($(this).html());$(this).html(e)}),$("#wpSummaryLabel .mw-summary-preset-item a").click(function(){var summary=$("#wpSummary").val(),pre=$(this).text();return-1==summary.indexOf(pre)?(summary.length>0&&" "!=summary[summary.length-1]&&(summary+=" "),summary+=pre):summary=summary.replace(eval("/( *)"+pre+"( *)/"),"$1"),$("#wpSummary").val(summary),!1}),$(".mw-summary-preset-item").css({"border-left":"1px solid #aaa",padding:"0 0.5em"}),$(".mw-summary-preset-item:first-child").css({"border-left":"none","padding-left":"0.2em"}),$(".mw-summary-preset-item:last-child").css({"padding-right":"0.2em"})}(),mw.util.addCSS(".wikiEditor-ui-toolbar .page-characters div span {box-sizing: content-box !important;font-family: monospace;}"),mw.loader.using("user.options",function(){1==mw.user.options.get("usebetatoolbar")&&$.when(mw.loader.using("ext.wikiEditor.toolbar"),$.ready).then(function(){pw.hook.keep("edit")})})},8:function(e,t,a){e.exports=a(7)}});